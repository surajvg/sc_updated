/**
 * ScheduleGanttView.js - read-only Gantt of the SAVED production schedule for a date range.
 * Used from AssignPCB.js ("View Schedule" button beside "Monitoring Live Tasks").
 *
 * Backend: GET {apiBase}/schedule/plans/view?date_from=YYYY-MM-DD&date_to=YYYY-MM-DD[&plan_id=]
 *          (default plan = the baseline plan of each plant, else its latest saved plan)
 *          GET {apiBase}/schedule/plans  -> plan picker
 * Nothing on this screen changes the schedule.
 */
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
    Alert, Box, Button, Chip, CircularProgress, Dialog, DialogContent, DialogTitle, Divider, FormControl,
    IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Tooltip, Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const PALETTE = ["#2563eb", "#16a34a", "#d97706", "#9333ea", "#dc2626", "#0891b2", "#db2777", "#65a30d",
    "#7c3aed", "#ea580c", "#0d9488", "#4f46e5", "#b45309", "#be123c", "#15803d", "#1d4ed8"];
const LABEL_W = 250;      // left column (process names)
const LANE_H = 22;        // one bar lane
const ROW_PAD = 6;
const MAX_DAYS = 62;

/* ---------- small date helpers (all on "YYYY-MM-DD" / "YYYY-MM-DDTHH:MM:SS" strings, no time-zone shifts) ---------- */
const pad = (n) => String(n).padStart(2, "0");
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const addDays = (s, n) => { const d = new Date(`${s}T00:00:00`); d.setDate(d.getDate() + n); return ymd(d); };
const daysBetween = (a, b) => Math.round((new Date(`${b}T00:00:00`) - new Date(`${a}T00:00:00`)) / 86400000);
const hourOf = (iso) => Number(iso.slice(11, 13)) + Number(iso.slice(14, 16)) / 60;
const hm = (iso) => (iso ? iso.slice(11, 16) : "");
const dayLabel = (s) => new Date(`${s}T00:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" });
const fmt = (iso) => (iso ? `${new Date(iso.slice(0, 10) + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} ${hm(iso)}` : "-");
const hourText = (h) => `${pad(Math.floor(h))}:${pad(Math.round((h % 1) * 60))}`;

/* bars that overlap in one row (parallel machines, shared batch) go on separate lanes */
function assignLanes(segs) {
    const ends = [];
    const out = [...segs].sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0)).map((s) => {
        let lane = ends.findIndex((e) => e <= s.start);
        if (lane < 0) { lane = ends.length; ends.push(s.end); } else ends[lane] = s.end;
        return { ...s, lane };
    });
    return { segs: out, lanes: Math.max(1, ends.length) };
}

export default function ScheduleGanttView({ open, onClose, apiBase, authHeaders }) {
    const today = ymd(new Date());
    const [from, setFrom] = useState(today);
    const [to, setTo] = useState(addDays(today, 6));
    const [planId, setPlanId] = useState("base");         // "base" = current baseline plan
    const [plans, setPlans] = useState([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [hoverPo, setHoverPo] = useState(null);
    const [pinPo, setPinPo] = useState(null);

    const headers = () => (authHeaders ? authHeaders() : { "x-access-token": localStorage.getItem("token") || "" });
    const nDays = from && to ? daysBetween(from, to) + 1 : 0;
    const rangeError = !from || !to ? "Pick both dates"
        : nDays < 1 ? "'To' must be on or after 'From'"
            : nDays > MAX_DAYS ? `Pick at most ${MAX_DAYS} days` : null;

    /* plan list (once per open) */
    useEffect(() => {
        if (!open) return;
        axios.get(`${apiBase}/schedule/plans`, { headers: headers() })
            .then((r) => setPlans(r.data?.plans || []))
            .catch(() => setPlans([]));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, apiBase]);

    /* the schedule for the range */
    useEffect(() => {
        if (!open || rangeError) return;
        let alive = true;
        setLoading(true);
        setError(null);
        const params = { date_from: from, date_to: to };
        if (planId !== "base") params.plan_id = planId;
        axios.get(`${apiBase}/schedule/plans/view`, { headers: headers(), params })
            .then((r) => { if (alive) setData(r.data); })
            .catch((e) => { if (alive) { setData(null); setError(e.response?.data?.detail || "Could not load the schedule."); } })
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, apiBase, from, to, planId, rangeError]);

    const days = useMemo(() => (rangeError ? [] : Array.from({ length: nDays }, (_, i) => addDays(from, i))), [from, nDays, rangeError]);
    const dayIndex = useMemo(() => Object.fromEntries(days.map((d, i) => [d, i])), [days]);
    const dayW = Math.max(110, Math.min(260, Math.floor(1350 / Math.max(1, days.length))));
    const winStart = data?.day_window?.start_hour ?? 8;
    const winEnd = data?.day_window?.end_hour ?? 24;
    const winLen = Math.max(1, winEnd - winStart);

    const colorOf = useMemo(() => {
        const m = {};
        (data?.pos || []).forEach((p, i) => { m[p.production_order] = PALETTE[i % PALETTE.length]; });
        return (po) => m[po] || "#64748b";
    }, [data]);

    const q = search.trim().toLowerCase();
    const matches = (s) => !q || s.po.toLowerCase().includes(q) || (s.part || "").toLowerCase().includes(q);
    const focusPo = hoverPo || pinPo;

    const rows = useMemo(() => (data?.rows || []).map((r) => ({ ...r, ...assignLanes(r.segments) })), [data]);

    const xOf = (iso) => {
        const i = dayIndex[iso.slice(0, 10)];
        if (i === undefined) return null;
        const f = Math.min(1, Math.max(0, (hourOf(iso) - winStart) / winLen));
        return i * dayW + f * dayW;
    };

    const setPreset = (n) => { setFrom(today); setTo(addDays(today, n - 1)); };
    const setMonth = () => {
        const d = new Date();
        setFrom(ymd(new Date(d.getFullYear(), d.getMonth(), 1)));
        setTo(ymd(new Date(d.getFullYear(), d.getMonth() + 1, 0)));
    };

    const plan = data?.plans?.[0];
    const gridW = days.length * dayW;
    let lastSection = null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl" PaperProps={{ sx: { borderRadius: 3, height: "90vh" } }}>
            <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Production Schedule</Typography>
                <Chip icon={<VisibilityIcon />} label="View only" size="small" variant="outlined" />
                <Box sx={{ flex: 1 }} />
                <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
            </DialogTitle>
            <Divider />

            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: 2 }}>
                {/* ---------- filters ---------- */}
                <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
                    <TextField label="From" type="date" size="small" value={from} onChange={(e) => setFrom(e.target.value)}
                        InputLabelProps={{ shrink: true }} sx={{ width: 160 }} />
                    <TextField label="To" type="date" size="small" value={to} onChange={(e) => setTo(e.target.value)}
                        InputLabelProps={{ shrink: true }} sx={{ width: 160 }} inputProps={{ min: from }} />
                    <Stack direction="row" spacing={0.5}>
                        <Chip label="7 days" size="small" onClick={() => setPreset(7)} />
                        <Chip label="14 days" size="small" onClick={() => setPreset(14)} />
                        <Chip label="This month" size="small" onClick={setMonth} />
                    </Stack>
                    <FormControl size="small" sx={{ minWidth: 260 }}>
                        <InputLabel>Plan</InputLabel>
                        <Select value={planId} label="Plan" onChange={(e) => setPlanId(e.target.value)}>
                            <MenuItem value="base">Current plan (baseline)</MenuItem>
                            {plans.map((p) => (
                                <MenuItem key={p.id} value={p.id}>
                                    {p.name}{p.plant ? ` · ${p.plant}` : ""}{p.is_baseline ? " · baseline" : ""}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField placeholder="Find PO / part" size="small" value={search} onChange={(e) => setSearch(e.target.value)}
                        sx={{ width: 200 }}
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }} />
                    <Box sx={{ flex: 1 }} />
                    {plan && (
                        <Typography variant="caption" color="text.secondary">
                            {data.plans.length > 1 ? `${data.plans.length} plans (one per plant)` : `${plan.name}${plan.is_baseline ? " (baseline)" : ""}`}
                            {plan.created_at ? ` · saved ${fmt(plan.created_at)}` : ""}
                        </Typography>
                    )}
                </Stack>

                {rangeError && <Alert severity="warning">{rangeError}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}

                {/* ---------- chart ---------- */}
                <Box sx={{ flex: 1, minHeight: 0, border: "1px solid #e2e8f0", borderRadius: 2, overflow: "auto", position: "relative", bgcolor: "#fff" }}>
                    {loading && (
                        <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(255,255,255,.6)", zIndex: 5 }}>
                            <CircularProgress size={36} />
                        </Box>
                    )}
                    {!loading && !error && !rangeError && data && rows.length === 0 && (
                        <Box sx={{ p: 6, textAlign: "center", color: "text.secondary" }}>
                            {data.plans.length === 0
                                ? "No saved schedule yet. Save a plan on the Production Schedule page first."
                                : "Nothing is scheduled between these dates."}
                        </Box>
                    )}
                    {rows.length > 0 && !rangeError && (
                        <Box sx={{ width: LABEL_W + gridW, position: "relative" }}>
                            {/* header: days + hour ticks */}
                            <Box sx={{ display: "flex", position: "sticky", top: 0, zIndex: 3, bgcolor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                                <Box sx={{ width: LABEL_W, flexShrink: 0, position: "sticky", left: 0, zIndex: 4, bgcolor: "#f8fafc", borderRight: "1px solid #e2e8f0", px: 1.5, display: "flex", alignItems: "center" }}>
                                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#475569" }}>PROCESS</Typography>
                                </Box>
                                {days.map((d) => (
                                    <Box key={d} sx={{ width: dayW, flexShrink: 0, borderRight: "1px solid #e2e8f0", bgcolor: d === today ? "#eff6ff" : undefined }}>
                                        <Typography variant="caption" sx={{ display: "block", textAlign: "center", fontWeight: 700, color: d === today ? "#1d4ed8" : "#334155", pt: 0.5 }}>
                                            {dayLabel(d)}
                                        </Typography>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", px: 0.5, pb: 0.3 }}>
                                            {[winStart, winStart + winLen / 2, winEnd].map((h) => (
                                                <Typography key={h} sx={{ fontSize: 10, color: "#94a3b8" }}>{hourText(h)}</Typography>
                                            ))}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>

                            {/* rows */}
                            {rows.map((r) => {
                                const h = r.lanes * LANE_H + ROW_PAD * 2;
                                const header = r.section && r.section !== lastSection;
                                lastSection = r.section;
                                return (
                                    <React.Fragment key={r.row_id}>
                                        {header && (
                                            <Box sx={{ display: "flex", bgcolor: "#f1f5f9", borderBottom: "1px solid #e2e8f0" }}>
                                                <Box sx={{ width: LABEL_W, position: "sticky", left: 0, bgcolor: "#f1f5f9", px: 1.5, py: 0.3 }}>
                                                    <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 0.5, color: "#475569" }}>{r.section}</Typography>
                                                </Box>
                                            </Box>
                                        )}
                                        <Box sx={{ display: "flex", borderBottom: "1px solid #f1f5f9", height: h }}>
                                            <Box sx={{ width: LABEL_W, flexShrink: 0, position: "sticky", left: 0, zIndex: 2, bgcolor: "#fff", borderRight: "1px solid #e2e8f0", px: 1.5, display: "flex", alignItems: "center" }}>
                                                <Typography variant="body2" noWrap title={r.title} sx={{ fontWeight: 600, fontSize: 12.5, color: "#1e293b" }}>
                                                    {r.title}
                                                    {r.kind === "LINE" && <Chip label="LINE" size="small" sx={{ ml: 0.75, height: 16, fontSize: 9 }} />}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ position: "relative", width: gridW, flexShrink: 0 }}>
                                                {/* day separators + today tint */}
                                                {days.map((d, i) => (
                                                    <Box key={d} sx={{ position: "absolute", top: 0, bottom: 0, left: i * dayW, width: dayW, borderRight: "1px solid #f1f5f9", bgcolor: d === today ? "rgba(59,130,246,.05)" : undefined }} />
                                                ))}
                                                {r.segs.map((s, k) => {
                                                    const x1 = xOf(s.start), x2 = xOf(s.end);
                                                    if (x1 === null || x2 === null) return null;
                                                    const w = Math.max(3, x2 - x1);
                                                    const dim = (focusPo && s.po !== focusPo) || !matches(s);
                                                    const tip = (
                                                        <Box sx={{ fontSize: 12, lineHeight: 1.5 }}>
                                                            <b>PO {s.po}</b> · {s.part} ({s.role})<br />
                                                            {r.name}{s.step ? ` → ${s.step}` : ""}<br />
                                                            {fmt(s.start)} – {hm(s.end)} ({Math.round(s.minutes)} min)<br />
                                                            {s.machine ? <>Machine: {s.machine}<br /></> : null}
                                                            {s.batch ? <>Batch {s.batch.no}/{s.batch.count}: {s.batch.qty} of {s.batch.size} PCBs</> : null}
                                                        </Box>
                                                    );
                                                    return (
                                                        <Tooltip key={k} title={tip} arrow placement="top" disableInteractive>
                                                            <Box
                                                                onMouseEnter={() => setHoverPo(s.po)}
                                                                onMouseLeave={() => setHoverPo(null)}
                                                                onClick={() => setPinPo((p) => (p === s.po ? null : s.po))}
                                                                sx={{
                                                                    position: "absolute", left: x1, width: w, top: ROW_PAD + s.lane * LANE_H + 1, height: LANE_H - 3,
                                                                    bgcolor: colorOf(s.po), borderRadius: "4px", opacity: dim ? 0.18 : 1, cursor: "pointer",
                                                                    color: "#fff", fontSize: 10.5, fontWeight: 600, lineHeight: `${LANE_H - 3}px`, px: 0.5,
                                                                    overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
                                                                    boxShadow: focusPo === s.po ? "0 0 0 2px #0f172a" : "none",
                                                                    transition: "opacity .12s",
                                                                }}
                                                            >
                                                                {w > 46 ? (s.step && r.kind === "LINE" ? `${s.po} · ${s.step}` : s.po) : ""}
                                                            </Box>
                                                        </Tooltip>
                                                    );
                                                })}
                                            </Box>
                                        </Box>
                                    </React.Fragment>
                                );
                            })}
                        </Box>
                    )}
                </Box>

                {/* ---------- PO legend ---------- */}
                {(data?.pos || []).length > 0 && (
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
                        <Typography variant="caption" sx={{ fontWeight: 700, color: "#475569", mr: 0.5 }}>POs in range:</Typography>
                        {data.pos.map((p) => (
                            <Tooltip key={p.production_order} arrow
                                title={`${p.part_number} · ${p.role} · qty ${p.quantity} · plan ${fmt(p.start)} → ${fmt(p.end)}${p.forced ? " · scheduled without child PCBs" : ""}`}>
                                <Chip
                                    size="small"
                                    onMouseEnter={() => setHoverPo(p.production_order)}
                                    onMouseLeave={() => setHoverPo(null)}
                                    onClick={() => setPinPo((x) => (x === p.production_order ? null : p.production_order))}
                                    icon={p.forced ? <WarningAmberIcon sx={{ color: "#b45309 !important" }} /> : undefined}
                                    label={`${p.production_order} · ${p.part_number}`}
                                    variant={pinPo === p.production_order ? "filled" : "outlined"}
                                    sx={{ borderColor: colorOf(p.production_order), borderLeft: `6px solid ${colorOf(p.production_order)}`, fontWeight: 600 }}
                                />
                            </Tooltip>
                        ))}
                        {pinPo && <Button size="small" onClick={() => setPinPo(null)}>Clear highlight</Button>}
                    </Stack>
                )}
            </DialogContent>
        </Dialog>
    );
}
