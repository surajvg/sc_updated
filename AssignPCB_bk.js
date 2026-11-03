


// // //Assign task Card!

// // import React, { useState, useEffect, useMemo } from "react"; 
// // import axios from "axios"; 
// // import {
// //   Box,
// //   Button,
// //   Typography,
// //   Table,
// //   TableHead,
// //   TableRow,
// //   TableCell,
// //   TableBody,
// //   Paper,
// //   Alert,
// //   CircularProgress, 
// //   TableContainer,
// //   Checkbox,
// //   Stack,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   Chip,
// //   Snackbar, 
// //   Container,
// //   Grid,
// //   ButtonGroup
// // } from "@mui/material";
// // import RefreshIcon from "@mui/icons-material/Refresh"; 
// // import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'; 
// // import ListAltIcon from '@mui/icons-material/ListAlt';
// // import AssignmentIcon from '@mui/icons-material/Assignment';
// // import PersonIcon from '@mui/icons-material/Person';
// // import { useSelector } from "react-redux";

// // // Configuration
// // const API_BASE_URL = "http://192.168.0.20:8082/api/pcb";
// // const API_BASE_URL_ASSIGN = "http://192.168.0.20:2000/supervisor/assign";
// // // Note: You might want to make the staff_no dynamic based on logged in user later

// // // Filter Categories
// // const FILTER_CATEGORIES = [
// //   "All",
// //   "HEXA-CHILD",
// //   "HEXA-MAIN",
// //   "OCTA-CHILD",
// //   "OCTA-MAIN"
// // ];

// // const BUTTON_OPTS = [
// //   { id: "1", name: "TO BE ASSIGNED", icon: <ListAltIcon /> },
// //   { id: "2", name: "ASSIGNED", icon: <AssignmentIcon /> },
// // ];

// // function AssignPCB() {

// //     // Tab 1 Data
// //     const [dbPCBs, setDbPCBs] = useState([]); 

// //     // Tab 2 Data
// //     const [assignedPCBs, setAssignedPCBs] = useState([]);

// //     const [isLoading, setIsLoading] = useState(false); 
// //     const [error, setError] = useState(null); 

// //     // Selection and Filter States
// //     const [selectedIds, setSelectedIds] = useState(new Set()); 
// //     const [filterCategory, setFilterCategory] = useState("All"); 





// //   const configDetails = useSelector(state => state.MROTDataSavingReducer.configDetails)



// //   var API1 = "/supervisor/assign"

// //   var API2 = "/api/pcb/filter?status=Inaction"


// //   var API3 = "/supervisor/view"

// //   var PythonServer = "http://127.0.0.1:2000" + API1

// //   var PythonServerViewandAssigned = "http://192.168.0.20:2000" + API3

// //   var NodeServerIP = "http://192.168.0.20:8082" + API2


// //   if (configDetails != undefined) {

// //     console.log("configDetails",configDetails)

// //     if (configDetails.project[0].ServerIP != undefined) {
// //         console.log("configDetails.project[0].ServerIP ",configDetails.project[0].ServerIP)
// //       if (configDetails.project[0].ServerIP[0].PythonServerIP != undefined) {

// //         PythonServer = configDetails.project[0].ServerIP[0].PythonServerIP + API1


// //         PythonServerViewandAssigned = configDetails.project[0].ServerIP[0].PythonServerIP + API3


// //         NodeServerIP = configDetails.project[0].ServerIP[0].NodeServerIP + API2
// //       }



// //     }

// //   }




// //     // Active Tab State
// //     const [Bid, SetBid] = React.useState("1");

// //     function dataSelection(id) {
// //       SetBid(id);
// //       setError(null); // Clear errors when switching tabs
// //     }

// //     // Notification State
// //     const [snackbar, setSnackbar] = useState({ open: false, msg: "", type: "info" });

// //     // ==========================================
// //     // FETCH EFFECTS
// //     // ==========================================

// //     // Trigger fetch whenever the Tab (Bid) changes
// //     useEffect(() => {
// //         if (Bid === "1") {
// //             fetchInactionPCBs();
// //         } else if (Bid === "2") {
// //             fetchAssignedPCBs();
// //         }
// //     }, [Bid]);

// //     // 1. Fetch "TO BE ASSIGNED" (Inaction)
// //     const fetchInactionPCBs = async () => {
// //         setIsLoading(true);
// //         setError(null);
// //         setSelectedIds(new Set()); 
// //         try {
// //           const response = await fetch(NodeServerIP);

// //           if (!response.ok) {
// //             throw new Error("Failed to fetch data from database");
// //           }

// //           const data = await response.json();

// //           const processItem = (item) => {
// //             let compositeType = item.Type;
// //             if (!compositeType && item.type && item.source) {
// //                  compositeType = `${item.type}-${item.source}`.toUpperCase();
// //             }
// //             return compositeType || "UNKNOWN";
// //           };

// //           const processedData = data.map(item => ({
// //               ...item,
// //               Type: processItem(item)
// //           }));

// //           setDbPCBs(processedData); 
// //         } catch (err) {
// //           console.error("Error fetching PCBs:", err);
// //           setError(err.message);
// //           setDbPCBs([]); 
// //         } finally {
// //           setIsLoading(false);
// //         }
// //     };
// //     let user = JSON.parse(localStorage.getItem("user"));
// //     // 2. Fetch "ASSIGNED" (Supervisor View)
// //     const fetchAssignedPCBs = async () => {
// //         setIsLoading(true);


// //         setError(null);

// //         const requestParams = { staff_no: user?.id };
// //         try {
// //             const response = await axios.get(PythonServerViewandAssigned,{ params: requestParams });
// //             console.log("response.data",response.data)
// //             // The API returns an object with a 'pcbs' array
// //             if (response.data && response.data.pcbs) {

// //                 console.log("response.data",response.data)
// //                 setAssignedPCBs(response.data.pcbs);
// //             } else {
// //                 setAssignedPCBs([]);
// //             }
// //         } catch (err) {
// //             console.error("Error fetching Assigned PCBs:", err);
// //             setError("Failed to load assigned tasks.");
// //             setAssignedPCBs([]);
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     // ==========================================
// //     // ASSIGN LOGIC
// //     // ==========================================
// //     const handleAssign = async () => {
// //       if (selectedIds.size === 0) return;

// //       const user = JSON.parse(localStorage.getItem("user"));
// //       if (!user) {
// //           setSnackbar({ open: true, msg: "User details not found. Please log in.", type: "error" });
// //           return;
// //       }

// //       const selectedItems = dbPCBs.filter((pcb, index) => {
// //           const id = getPcbId(pcb, index);
// //           return selectedIds.has(id);
// //       });

// //       const payload = {
// //           supervisor_staff_no: user?.id,
// //           pcb_serial_parts: selectedItems.map(item => item.PCBserialNoPartNumber)
// //       };
// //       console.log("pcb_serial_parts: ",payload.pcb_serial_parts)
// //       try {
// //           await axios.post(
// //             PythonServer, 
// //               null, 
// //               { params: payload }
// //           );

// //           setSnackbar({ open: true, msg: `Successfully assigned ${selectedItems.length} PCBs.`, type: "success" });
// //           // Refresh the list after assignment
// //           fetchInactionPCBs(); 
// //       } catch (err) {
// //           console.error("Assign Error:", err);
// //           setSnackbar({ open: true, msg: "Failed to assign work. Check server logs.", type: "error" });
// //       }
// //   };

// //     // ==========================================
// //     // FILTERING LOGIC (For Tab 1)
// //     // ==========================================
// //     const visiblePCBs = useMemo(() => {
// //         if (filterCategory === "All") return dbPCBs;
// //         return dbPCBs.filter((pcb) => pcb.Type === filterCategory);
// //     }, [dbPCBs, filterCategory]);

// //     // ==========================================
// //     // SELECTION HANDLERS
// //     // ==========================================

// //     const getPcbId = (pcb, index) => pcb.serialNo || pcb.serialNumber || pcb._pcb_key_id || `unknown-${index}`;

// //     const handleSelectAll = (e) => {
// //         const isChecked = e.target.checked;
// //         const newSelected = new Set(selectedIds);

// //         visiblePCBs.forEach((pcb, i) => {
// //             const id = getPcbId(pcb, i);
// //             if (isChecked) {
// //                 newSelected.add(id);
// //             } else {
// //                 newSelected.delete(id);
// //             }
// //         });
// //         setSelectedIds(newSelected);
// //     };

// //     const toggleSelect = (id) => {
// //         const newSelected = new Set(selectedIds);
// //         if (newSelected.has(id)) {
// //             newSelected.delete(id);
// //         } else {
// //             newSelected.add(id);
// //         }
// //         setSelectedIds(newSelected);
// //     };

// //     // ==========================================
// //     // HELPER: Base Columns for Tab 1
// //     // ==========================================
// //     const firstItem = dbPCBs[0];
// //     const HIDDEN_FIELDS = [
// //       "id", "linkedOperations", "isWorkAssigned", "_pcb_key_id", 
// //       "_id", "__v", "Type", "source", "type",
// //       "salary", "password" ,"PCBserialNoPartNumber","quantity","userID","userName","userRole","userSBU","userSBUDIV","updatedAt","createdAt","status"
// //     ];

// //     const baseColumns = firstItem 
// //       ? Object.keys(firstItem).filter((k) => !HIDDEN_FIELDS.includes(k))
// //       : [];

// //     const isAllSelected = visiblePCBs.length > 0 && visiblePCBs.every((pcb, i) => {
// //         return selectedIds.has(getPcbId(pcb, i));
// //     });

// //     const isIndeterminate = visiblePCBs.some((pcb, i) => selectedIds.has(getPcbId(pcb, i))) && !isAllSelected;

// //     return (
// //       <Box sx={{ maxWidth: "100%", mx: "auto" }}>

// //         {/* 1. PROFESSIONAL BUTTONS SECTION */}
// //         <Container sx={{ mt: 3, mb: 3 }}>
// //             <Paper elevation={3} sx={{ borderRadius: '50px', width: 'fit-content', mx: 'auto', p: 0.5, bgcolor: '#f5f5f5' }}>
// //                 <Stack direction="row" spacing={1}>
// //                     {BUTTON_OPTS.map((item) => {
// //                         const isActive = Bid === item.id;
// //                         return (
// //                             <Button
// //                                 key={item.id}
// //                                 onClick={() => dataSelection(item.id)}
// //                                 variant={isActive ? "contained" : "text"}
// //                                 startIcon={item.icon}
// //                                 sx={{
// //                                     borderRadius: '50px',
// //                                     px: 4,
// //                                     py: 1,
// //                                     fontWeight: 'bold',
// //                                     textTransform: 'none',
// //                                     transition: 'all 0.3s ease',
// //                                     backgroundColor: isActive ? 'primary.main' : 'transparent',
// //                                     color: isActive ? 'white' : 'black',
// //                                     boxShadow: isActive ? 4 : 0,
// //                                     '&:hover': {
// //                                         backgroundColor: isActive ? 'primary.dark' : 'rgba(0,0,0,0.05)',
// //                                     }
// //                                 }}
// //                             >
// //                                 {item.name}
// //                             </Button>
// //                         )
// //                     })}
// //                 </Stack>
// //             </Paper>
// //         </Container>

// //         {/* Error Display */}
// //         {error && (
// //             <Alert severity="error" sx={{ mb: 2, mx: 2 }}>{error}</Alert>
// //         )}

// //         {/* Loading Display */}
// //         {isLoading && (
// //             <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
// //                 <CircularProgress />
// //             </Box>
// //         )}

// //         {/* ==============================================
// //             TAB 1: TO BE ASSIGNED (Interactive Table)
// //             ==============================================
// //         */}
// //         {Bid === "1" && !isLoading && (
// //             <>
// //                 {/* Header with Filter, Refresh AND Assign Button */}
// //                 <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //                     <Stack direction="row" spacing={2} alignItems="center">
// //                         <Typography variant="h6" color="primary">Inaction / Available PCBs</Typography>

// //                         <FormControl size="small" sx={{ minWidth: 180 }}>
// //                             <InputLabel>Filter Category</InputLabel>
// //                             <Select
// //                                 value={filterCategory}
// //                                 label="Filter Category"
// //                                 onChange={(e) => setFilterCategory(e.target.value)}
// //                             >
// //                                 {FILTER_CATEGORIES.map((cat) => (
// //                                     <MenuItem key={cat} value={cat}>{cat}</MenuItem>
// //                                 ))}
// //                             </Select>
// //                         </FormControl>
// //                     </Stack>

// //                     <Stack direction="row" spacing={2} alignItems="center">
// //                         {selectedIds.size > 0 && (
// //                             <Chip label={`${selectedIds.size} Selected`} color="primary" variant="outlined" />
// //                         )}

// //                         <Button 
// //                             variant="contained" 
// //                             color="secondary" 
// //                             startIcon={<AssignmentTurnedInIcon />}
// //                             disabled={selectedIds.size === 0}
// //                             onClick={handleAssign}
// //                         >
// //                             Assign Work
// //                         </Button>
// //                     </Stack>
// //                 </Paper>

// //                 {dbPCBs.length === 0 ? (
// //                 <Paper sx={{ p: 5, textAlign: "center", borderRadius: 3 }}>
// //                     <Typography variant="body1" color="black">No PCBs found with status "Inaction".</Typography>
// //                 </Paper>
// //                 ) : (
// //                 <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 3, boxShadow: 2 }}>
// //                     <TableContainer sx={{ maxHeight: '65vh' }}>
// //                     <Table stickyHeader size="small">
// //                         <TableHead>
// //                         <TableRow>
// //                             <TableCell padding="checkbox" sx={{ bgcolor: "#f1f5f9" }}>
// //                                 <Checkbox
// //                                     color="primary"
// //                                     indeterminate={isIndeterminate}
// //                                     checked={isAllSelected}
// //                                     onChange={handleSelectAll}
// //                                     disabled={visiblePCBs.length === 0}
// //                                 />
// //                             </TableCell>

// //                             {baseColumns.map((col) => (
// //                             <TableCell key={col} sx={{ fontWeight: "bold", bgcolor: "#f1f5f9" }}>
// //                                 {col.toUpperCase()}
// //                             </TableCell>
// //                             ))}
// //                             <TableCell sx={{ fontWeight: "bold", bgcolor: "#f1f5f9" }}>TYPE</TableCell>
// //                             <TableCell sx={{ fontWeight: "bold", bgcolor: "#f1f5f9" }}>STATUS</TableCell>
// //                         </TableRow>
// //                         </TableHead>
// //                         <TableBody>
// //                         {visiblePCBs.map((pcb, i) => {
// //                             const uniqueId = pcb.serialNo || pcb.serialNumber || pcb._pcb_key_id || `unknown-${i}`;
// //                             const isSelected = selectedIds.has(uniqueId);

// //                             return (
// //                             <TableRow 
// //                                 hover 
// //                                 key={uniqueId} 
// //                                 selected={isSelected} 
// //                                 onClick={() => toggleSelect(uniqueId)} 
// //                                 sx={{ cursor: 'pointer' }}
// //                             >
// //                                 <TableCell padding="checkbox">
// //                                     <Checkbox
// //                                         color="primary"
// //                                         checked={isSelected}
// //                                         onClick={(e) => {
// //                                             e.stopPropagation();
// //                                             toggleSelect(uniqueId);
// //                                         }}
// //                                     />
// //                                 </TableCell>

// //                                 {baseColumns.map((col) => (
// //                                 <TableCell key={col}>
// //                                     {pcb[col]}
// //                                 </TableCell>
// //                                 ))}

// //                                 <TableCell>
// //                                     <Chip label={pcb.Type || "UNKNOWN"} size="small" variant="outlined" />
// //                                 </TableCell>

// //                                 <TableCell>
// //                                 <Chip 
// //                                     label={pcb.isWorkAssigned ? "ASSIGNED" : "PENDING"} 
// //                                     color={pcb.isWorkAssigned ? "success" : "warning"}
// //                                     size="small"
// //                                     variant="filled"
// //                                 />
// //                                 </TableCell>
// //                             </TableRow>
// //                             );
// //                         })}
// //                         </TableBody>
// //                     </Table>
// //                     </TableContainer>
// //                 </Paper>
// //                 )}
// //             </>
// //         )}

// //         {/* ==============================================
// //             TAB 2: ASSIGNED (Read-Only Table)
// //             ==============================================
// //         */}
// //         {Bid === "2" && !isLoading && (
// //             <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 3, boxShadow: 2, mt: 2 }}>
// //                 {assignedPCBs.length === 0 ? (
// //                     <Box sx={{ p: 5, textAlign: "center" }}>
// //                         <Typography variant="body1" color="black">No assigned tasks found.</Typography>
// //                     </Box>
// //                 ) : (
// //                     <TableContainer sx={{ maxHeight: '70vh' }}>
// //                         <Table stickyHeader>
// //                             <TableHead>
// //                                 <TableRow>
// //                                     <TableCell sx={{ bgcolor: "#e3f2fd", fontWeight: 'bold' }}>SERIAL NO</TableCell>
// //                                     <TableCell sx={{ bgcolor: "#e3f2fd", fontWeight: 'bold' }}>PART NUMBER</TableCell>
// //                                     <TableCell sx={{ bgcolor: "#e3f2fd", fontWeight: 'bold' }}>PRESENT STEP</TableCell>
// //                                     <TableCell sx={{ bgcolor: "#e3f2fd", fontWeight: 'bold' }}>PRESENT PROCESS NAME</TableCell>
// //                                     <TableCell sx={{ bgcolor: "#e3f2fd", fontWeight: 'bold' }}>PRESENT OPERATOR</TableCell>
// //                                     <TableCell sx={{ bgcolor: "#e3f2fd", fontWeight: 'bold' }}>TASK COMPLETED</TableCell>
// //                                     <TableCell sx={{ bgcolor: "#e3f2fd", fontWeight: 'bold' }}>PROCESS STATUS</TableCell>
// //                                     <TableCell sx={{ bgcolor: "#e3f2fd", fontWeight: 'bold' }}>OVERALL STATUS</TableCell>
// //                                 </TableRow>
// //                             </TableHead>
// //                             <TableBody>
// //                                 {assignedPCBs.map((row, index) => (
// //                                     <TableRow key={index} hover>
// //                                         <TableCell>{row.serialNo}</TableCell>
// //                                         <TableCell>{row.partNumber}</TableCell>
// //                                         <TableCell>{row.currentStepOrder}</TableCell>
// //                                         <TableCell>
// //                                             <Chip 
// //                                                 label={row.currentProcessName} 
// //                                                 size="small" 
// //                                                 color="primary" 
// //                                                 variant="outlined"
// //                                             />
// //                                         </TableCell>
// //                                         <TableCell>
// //                                             <Stack direction="row" alignItems="center" spacing={1}>
// //                                                 <PersonIcon fontSize="small" color="action" />
// //                                                 <Box>
// //                                                     <Typography variant="body2" fontWeight="bold">
// //                                                         {row.currentProcessOpeName}
// //                                                     </Typography>
// //                                                     <Typography variant="caption" color="black">
// //                                                         {row.currentProcessOpeStaffno ||'YET TO START'}
// //                                                     </Typography>
// //                                                 </Box>
// //                                             </Stack>
// //                                         </TableCell>
// //                                         <TableCell>{row.Tasks_Completed}</TableCell>
// //                                         <TableCell>
// //                                             <Chip 
// //                                                 label={row.currentProcessstatus} 
// //                                                 size="small" 
// //                                                 color={row.currentProcessstatus === "Start" ? "info" : "default"} 
// //                                             />
// //                                         </TableCell>
// //                                         <TableCell>
// //                                             <Chip 
// //                                                 label={row.Overall_PCB_status} 
// //                                                 color="success" 
// //                                                 size="small"
// //                                             />
// //                                         </TableCell>
// //                                     </TableRow>
// //                                 ))}
// //                             </TableBody>
// //                         </Table>
// //                     </TableContainer>
// //                 )}
// //             </Paper>
// //         )}

// //         {/* NOTIFICATIONS */}
// //         <Snackbar 
// //             open={snackbar.open} 
// //             autoHideDuration={4000} 
// //             onClose={() => setSnackbar({ ...snackbar, open: false })} 
// //             anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
// //         >
// //             <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.type} sx={{ width: '100%' }}>
// //                 {snackbar.msg}
// //             </Alert>
// //         </Snackbar>

// //       </Box>
// //     );
// //   };

// //   export default AssignPCB;



























// // AssignPCB.js - Enhanced Version
// // Features: 3 Tabs, Search, Smart Column Mapping, Realistic UI

// import React, { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import {
//     Box,
//     Button,
//     Typography,
//     Table,
//     TableHead,
//     TableRow,
//     TableCell,
//     TableBody,
//     Paper,
//     Alert,
//     CircularProgress,
//     TableContainer,
//     Checkbox,
//     Stack,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Chip,
//     Snackbar,
//     Container,
//     TextField,
//     InputAdornment,
//     IconButton,
//     Divider
// } from "@mui/material";

// // Icons
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import PersonIcon from '@mui/icons-material/Person';
// import SearchIcon from '@mui/icons-material/Search';
// import DoneAllIcon from '@mui/icons-material/DoneAll'; // Icon for Completed Tab
// import ClearIcon from '@mui/icons-material/Clear';

// import { useSelector } from "react-redux";
// import { CheckCircleIcon } from "lucide-react";
// import AssignmentInd from '@mui/icons-material/AssignmentInd';

// // --- Configuration & Constants ---

// // Tab Definitions
// // const BUTTON_OPTS = [
// //   { id: "1", name: "TO BE ASSIGNED", icon: <ListAltIcon />, color: "warning" },
// //   { id: "2", name: "ASSIGNED", icon: <AssignmentIcon />, color: "info" },
// //   { id: "3", name: "COMPLETED", icon: <DoneAllIcon />, color: "success" }, // New Tab
// // ];
// const BUTTON_OPTS = [
//     {
//         id: "1",
//         name: "TO BE ASSIGNED",
//         icon: <ListAltIcon sx={{ color: '#b26a00' }} />, // Muted Deep Amber
//         color: "warning"
//     },
//     {
//         id: "2",
//         name: "ASSIGNED",
//         icon: <AssignmentInd sx={{ color: '#455a64' }} />, // Professional Slate
//         color: "info"
//     },
//     {
//         id: "3",
//         name: "COMPLETED",
//         icon: <CheckCircleIcon sx={{ color: '#2e7d32' }} />, // Rich Forest Green
//         color: "success"
//     },
// ];

// // Filter Categories for Tab 1
// const FILTER_CATEGORIES = [
//     "All",
//     "HEXA-CHILD",
//     "HEXA-MAIN",
//     "OCTA-CHILD",
//     "OCTA-MAIN"
// ];

// // Helper: Column Name Formatter
// // Converts "camelCase" or "snake_case" or "messyDBKeys" to "Human Readable"
// const formatHeader = (key) => {
//     const map = {
//         "PCBserialNoPartNumber": "Serial / Part No",
//         "productionOrderNumber": "Prod. Order No",
//         "orderNumber": "Order No",
//         "createdAt": "Created Date",
//         "updatedAt": "Last Updated",
//         "serialNumber": "Serial No",
//         "partNumber": "Part No",
//         "type": "Type",
//         "quantity": "Qty"
//     };
//     if (map[key]) return map[key];

//     // Fallback: Split by capital letters and capitalize first letter
//     return key
//         .replace(/([A-Z])/g, ' $1')
//         .replace(/_/g, ' ')
//         .replace(/^./, (str) => str.toUpperCase())
//         .trim();
// };

// function AssignPCB() {

//     // --- State Management ---

//     // Data Store
//     const [dbPCBs, setDbPCBs] = useState([]);       // Tab 1 Data (Inaction)
//     const [assignedPCBs, setAssignedPCBs] = useState([]); // Tab 2 & 3 Data (View)

//     // UI State
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [Bid, SetBid] = React.useState("1"); // Current Tab ID
//     const [snackbar, setSnackbar] = useState({ open: false, msg: "", type: "info" });

//     // Filter & Search State
//     const [selectedIds, setSelectedIds] = useState(new Set());
//     const [filterCategory, setFilterCategory] = useState("All");
//     const [searchQuery, setSearchQuery] = useState(""); // Search State

//     // --- Redux & API Configuration (Existing Logic) ---
//     const configDetails = useSelector(state => state.MROTDataSavingReducer.configDetails);

//     // Default Endpoints
//     var API1 = "/supervisor/assign";
//     var API2 = "/api/pcb/filter?status=Inaction";
//     var API3 = "/supervisor/view";

//     var PythonServer = "http://127.0.0.1:2000" + API1;
//     var PythonServerViewandAssigned = "http://192.168.0.20:2000" + API3;
//     var NodeServerIP = "http://192.168.0.20:8082" + API2;

//     // Dynamic IP Overwrite from Redux
//     if (configDetails != undefined) {
//         if (configDetails.project && configDetails.project[0].ServerIP) {
//             const serverIPs = configDetails.project[0].ServerIP[0];
//             if (serverIPs.PythonServerIP) {
//                 PythonServer = serverIPs.PythonServerIP + API1;
//                 // console.log("PythonServer44",PythonServer)
//                 PythonServerViewandAssigned = serverIPs.PythonServerIP + API3;
//                 NodeServerIP = serverIPs.NodeServerIP + API2;
//             }
//         }
//     }

//     // --- Tab Switching Logic ---
//     function dataSelection(id) {
//         SetBid(id);
//         setError(null);
//         setSearchQuery(""); // Reset search on tab switch
//         setSelectedIds(new Set()); // Reset selection
//     }

//     // --- Fetch Effects ---
//     useEffect(() => {
//         if (Bid === "1") {
//             fetchInactionPCBs();
//         } else {
//             // Both Tab 2 (Assigned) and Tab 3 (Completed) use the Supervisor View API
//             fetchAssignedPCBs();
//         }
//     }, [Bid]);

//     // 1. Fetch "Inaction" PCBs (Node API)
//     const fetchInactionPCBs = async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const response = await fetch(NodeServerIP);
//             //   console.log("resp: ",response)
//             if (!response.ok) throw new Error("Failed to fetch data from database");

//             const data = await response.json();
//             // console.log("data: ", data);

//             // Process "Type" logic from your original code
//             const processedData = data.map(item => {
//                 let compositeType = item.Type;
//                 if (!compositeType && item.type && item.source) {
//                     compositeType = `${item.type}-${item.source}`.toUpperCase();
//                 }
//                 return { ...item, Type: compositeType || "UNKNOWN" };
//             });

//             setDbPCBs(processedData);
//         } catch (err) {
//             //   console.error("Error fetching PCBs:", err);
//             setError(err.message);
//             setDbPCBs([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // 2. Fetch "Assigned/View" PCBs (Python API)
//     const fetchAssignedPCBs = async () => {
//         setIsLoading(true);
//         setError(null);
//         const user = JSON.parse(localStorage.getItem("user"));
//         const requestParams = { staff_no: user?.id };

//         try {
//             const response = await axios.get(PythonServerViewandAssigned, { params: requestParams });
//             // console.log("resp: ",response.data);
//             if (response.data && response.data.pcbs) {
//                 setAssignedPCBs(response.data.pcbs);
//             } else {
//                 setAssignedPCBs([]);
//             }
//         } catch (err) {
//             // console.error("Error fetching Assigned PCBs:", err);
//             setError("Failed to load assigned tasks.");
//             setAssignedPCBs([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // --- Assignment Logic (Post to Python) ---
//     //     const handleAssign = async () => {
//     //       if (selectedIds.size === 0) return;

//     //       const user = JSON.parse(localStorage.getItem("user"));
//     //       if (!user) {
//     //           setSnackbar({ open: true, msg: "User details not found. Please log in.", type: "error" });
//     //           return;
//     //       }

//     //       // Get selected items based on IDs
//     //     //   console.log("dbPCBs: ",dbPCBs)
//     //       const selectedItems = dbPCBs.filter((pcb, index) => {
//     //         // console.log("index: ",index,"pcb: ",pcb)
//     //           const id = getPcbId(pcb, index);
//     //         //   console.log("id: ",id)
//     //           return selectedIds.has(id);
//     //       });

//     //       // Payload structure
//     //       const payload = {
//     //           supervisor_staff_no: user?.id,
//     //           pcb_serial_parts: selectedItems.map(item => item.PCBserialNoPartNumber)
//     //       };
//     //     //   console.log("pay load of [posting 846: ",payload)

//     //       try {
//     //           // Note: Your original code passed payload as params, maintaining that.
//     //           console.log("payload at main: ",payload)

//     //           await axios.post(PythonServer, null, { params: payload });

//     //           setSnackbar({ open: true, msg: `Successfully assigned ${selectedItems.length} PCBs.`, type: "success" });
//     //           setSelectedIds(new Set())
//     //           fetchInactionPCBs(); // Refresh list
//     //       } catch (err) {
//     //         //   console.error("Assign Error:", err);
//     //           setSnackbar({ open: true, msg: err.response.data.detail, type: "error" });
//     //       }
//     //   };

//     const handleAssign = async () => {
//         if (selectedIds.size === 0) return;

//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user) {
//             setSnackbar({ open: true, msg: "User details not found. Please log in.", type: "error" });
//             return;
//         }

//         // Get selected items based on IDs
//         const selectedItems = dbPCBs.filter((pcb, index) => {
//             const id = getPcbId(pcb, index);
//             return selectedIds.has(id);
//         });

//         // Payload structure
//         const payload = {
//             supervisor_staff_no: user?.id,
//             pcb_serial_parts: selectedItems.map(item => item.PCBserialNoPartNumber)
//         };

     
//         //     try {
//         //         console.log("Sending payload in body:", payload);

//         //         // CORRECTED: Pass payload as the second argument. 
//         //         // Do NOT use { params: payload } as that puts it in the URL.
//         //         await axios.post(PythonServer, payload);

//         //         setSnackbar({ open: true, msg: `Successfully assigned ${selectedItems.length} PCBs.`, type: "success" });
//         //         setSelectedIds(new Set());
//         //         fetchInactionPCBs(); // Refresh list
//         //     } catch (err) {
//         //         // Handle error response from server
//         //         const errorMsg = err.response?.data?.detail || "An error occurred during assignment.";
//         //         setSnackbar({ open: true, msg: errorMsg, type: "error" });
//         //     }
//         // };

//         try {
//             // Note: Your original code passed payload as params, maintaining that.
//             //   console.log("payload at main: ",payload)
//            // await axios.post(PythonServer, null, { params: payload });
//            await axios.post(PythonServer, payload);

//             setSnackbar({ open: true, msg: `Successfully assigned ${selectedItems.length} PCBs.`, type: "success" });
//             setSelectedIds(new Set())
//             fetchInactionPCBs(); // Refresh list
//         } catch (err) {
//             //   console.error("Assign Error:", err);
//             const errorMsg = err.response?.data?.detail || "An error occurred during assignment.";
//             setSnackbar({ open: true, msg: err.response.data.detail, type: "error" });
//         }
//     };

//     // --- Helper: ID Generation ---
//     function getPcbId(pcb, index) {
//         // console.log("pcb: ",pcb)
//         return pcb.PCBserialNoPartNumber || pcb._pcb_key_id || `unknown-${index}`
//     }
//     // const getPcbId = (pcb, index) =>pcb.serialNo || pcb.serialNumber || pcb._pcb_key_id || `unknown-${index}`  ;

//     // --- Filtering Logic (Search & Categories) ---

//     // Universal Filter function used by all tabs
//     const filterDataBySearch = (data) => {
//         if (!searchQuery) return data;
//         const lowerQuery = searchQuery.toLowerCase();

//         return data.filter(item => {
//             // Check Serial Number
//             const serial = (item.serialNo || item.serialNumber || "").toLowerCase();
//             // Check Production Order
//             const prodOrder = (item.productionOrderNumber || "").toLowerCase();
//             // Check Order Number
//             const orderNo = (item.orderNumber || "").toLowerCase();
//             // Check Part Number
//             const partNo = (item.partNumber || "").toLowerCase();

//             return serial.includes(lowerQuery) ||
//                 prodOrder.includes(lowerQuery) ||
//                 orderNo.includes(lowerQuery) ||
//                 partNo.includes(lowerQuery);
//         });
//     };

//     // 1. Visible Data for Tab 1 (Inaction)
//     const tab1Data = useMemo(() => {
//         let data = dbPCBs;

//         // Apply Category Filter
//         if (filterCategory !== "All") {
//             data = data.filter((pcb) => pcb.Type === filterCategory);
//         }
//         // Apply Search Filter
//         return filterDataBySearch(data);
//     }, [dbPCBs, filterCategory, searchQuery]);

//     // 2. Visible Data for Tab 2 (Assigned - In Progress)
//     const tab2Data = useMemo(() => {
//         // Filter for items that are NOT completed (Active, Start, Pause, etc.)
//         const data = assignedPCBs.filter(pcb => pcb.Overall_PCB_status !== "COMPLETED");
//         return filterDataBySearch(data);
//     }, [assignedPCBs, searchQuery]);

//     // 3. Visible Data for Tab 3 (Completed)
//     const tab3Data = useMemo(() => {
//         // Filter for items that ARE completed
//         const data = assignedPCBs.filter(pcb => pcb.Overall_PCB_status === "COMPLETED");
//         return filterDataBySearch(data);
//     }, [assignedPCBs, searchQuery]);


//     // --- Selection Handlers (Tab 1) ---
//     const handleSelectAll = (e) => {
//         const isChecked = e.target.checked;
//         const newSelected = new Set(selectedIds);
//         tab1Data.forEach((pcb, i) => {
//             const id = getPcbId(pcb, i);
//             isChecked ? newSelected.add(id) : newSelected.delete(id);
//         });
//         setSelectedIds(newSelected);
//     };

//     const toggleSelect = (id) => {
//         const newSelected = new Set(selectedIds);
//         newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
//         setSelectedIds(newSelected);
//     };

//     // Checkbox states
//     const isAllSelected = tab1Data.length > 0 && tab1Data.every((pcb, i) => selectedIds.has(getPcbId(pcb, i)));
//     const isIndeterminate = tab1Data.some((pcb, i) => selectedIds.has(getPcbId(pcb, i))) && !isAllSelected;


//     // --- Column Logic for Tab 1 (Inaction) ---
//     // This logic dynamically hides "id", "user*", and other internal fields
//     const getDynamicColumns = () => {
//         if (!dbPCBs.length) return [];
//         const firstItem = dbPCBs[0];

//         // Define Explicit Hidden Fields
//         const EXPLICIT_HIDDEN = ["password", "__v", "linkedOperations", "isWorkAssigned", "Type", "PCBserialNoPartNumber", "updatedAt", "status", "productionOrder", "createdAt"];

//         return Object.keys(firstItem).filter(key => {
//             const lowerKey = key.toLowerCase();

//             // Rule 1: Hide ID columns
//             if (lowerKey === "id" || lowerKey === "_id" || lowerKey.includes("key_id")) return false;

//             // Rule 2: Hide columns starting with "user"
//             if (lowerKey.startsWith("user")) return false;

//             // Rule 3: Hide explicit system fields
//             if (EXPLICIT_HIDDEN.includes(key)) return false;

//             return true;
//         });
//     };

//     const dynamicColumns = getDynamicColumns();

//     return (
//         <Box sx={{ maxWidth: "100%", mx: "auto", fontFamily: 'Inter, sans-serif' }}>

//             {/* --- 1. Navigation Tabs --- */}
//             <Container sx={{ mt: 3, mb: 3, display: 'flex', justifyContent: 'center' }}>
//                 <Paper elevation={0} sx={{ borderRadius: 8, bgcolor: '#f1f5f9', p: 0.8, display: 'inline-flex', gap: 1 }}>
//                     {BUTTON_OPTS.map((item) => {
//                         const isActive = Bid === item.id;
//                         return (
//                             <Button
//                                 key={item.id}
//                                 onClick={() => dataSelection(item.id)}
//                                 startIcon={item.icon}
//                                 disableRipple // Optional: cleaner look for professional dashboards
//                                 sx={{
//                                     borderRadius: '10px', // Sophisticated soft-square
//                                     px: 2,
//                                     py: 1,
//                                     fontSize: '0.875rem',
//                                     fontWeight: isActive ? 600 : 500,
//                                     textTransform: 'none', // 'none' is more professional than 'capitalize'
//                                     transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

//                                     // Background handling
//                                     backgroundColor: isActive ? '#ffffff' : 'transparent',
//                                     color: isActive ? '#0f172a' : '#64748b',

//                                     // Border and Shadow for the "Active" state
//                                     border: '1px solid',
//                                     borderColor: isActive ? '#e2e8f0' : 'transparent',
//                                     boxShadow: isActive
//                                         ? "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)"
//                                         : 'none',

//                                     '&:hover': {
//                                         backgroundColor: isActive ? '#ffffff' : 'rgba(0, 0, 0, 0.03)',
//                                         color: isActive ? '#0f172a' : '#334155',
//                                         transform: isActive ? 'none' : 'translateY(-1px)',
//                                     },

//                                     // Style for the Start Icon specifically
//                                     '& .MuiButton-startIcon': {
//                                         color: isActive ? (item.id === "3" ? "#10b981" : "#6366f1") : 'inherit',
//                                         marginRight: 1.5
//                                     }
//                                 }}
//                             >
//                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                                     <Typography variant="inherit">{item.name}</Typography>

//                                     {/* Professional Count Badge */}
//                                     <Box
//                                         component="span"
//                                         sx={{
//                                             display: 'inline-flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             px: 1,
//                                             minWidth: '24px',
//                                             height: '20px',
//                                             borderRadius: '6px',
//                                             fontSize: '0.75rem',
//                                             fontWeight: 700,
//                                             // Visual distinction for the badge
//                                             backgroundColor: isActive ? '#f1f5f9' : 'rgba(100, 116, 139, 0.1)',
//                                             color: isActive ? '#475569' : '#64748b',
//                                             transition: 'background-color 0.2s',
//                                         }}
//                                     >
//                                         {item.id === "1" ? tab1Data.length : item.id === "2" ? tab2Data.length : tab3Data.length}
//                                     </Box>
//                                 </Box>
//                             </Button>
//                         )
//                     })}
//                 </Paper>
//             </Container>

//             {/* --- 2. Action Bar (Search & Filters) --- */}
//             <Container maxWidth="xl" sx={{ mb: 3 }}>
//                 <Paper elevation={0} sx={{
//                     p: 2,
//                     borderRadius: 3,
//                     border: '1px solid #e2e8f0',
//                     display: 'flex',
//                     flexWrap: 'wrap',
//                     gap: 2,
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     bgcolor: 'white'
//                 }}>

//                     {/* Left: Search Bar */}
//                     <TextField
//                         placeholder="Search Serial No, Order No..."
//                         size="small"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         sx={{ width: { xs: '100%', md: 350 } }}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon color="action" />
//                                 </InputAdornment>
//                             ),
//                             endAdornment: searchQuery && (
//                                 // <IconButton size="small" >
//                                 <ClearIcon fontSize="small" onClick={() => setSearchQuery("")} style={{ cursor: 'poiter' }} />
//                                 // </IconButton>
//                             )
//                         }}
//                     />

//                     {/* Right: Tab Specific Actions */}
//                     {Bid === "1" ? (
//                         <Stack direction="row" spacing={2} alignItems="center">
//                             <FormControl size="small" sx={{ minWidth: 160 }}>
//                                 <InputLabel>Category</InputLabel>
//                                 <Select
//                                     value={filterCategory}
//                                     label="Category"
//                                     onChange={(e) => setFilterCategory(e.target.value)}
//                                 >
//                                     {FILTER_CATEGORIES.map((cat) => (
//                                         <MenuItem key={cat} value={cat}>{cat}</MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                             <Divider orientation="vertical" flexItem />
//                             {selectedIds.size > 0 && (
//                                 <Chip label={`${selectedIds.size} Selected`} color="primary" size="small" />
//                             )}
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 startIcon={<AssignmentTurnedInIcon />}
//                                 disabled={selectedIds.size === 0}
//                                 onClick={handleAssign}
//                                 sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
//                             >
//                                 Assign Selected
//                             </Button>
//                         </Stack>
//                     ) : (
//                         // Tabs 2 & 3 Status Chips
//                         <Chip
//                             label={Bid === "2" ? "Monitoring Live Tasks" : "Archived Tasks"}
//                             variant="outlined"
//                             color={Bid === "2" ? "info" : "success"}
//                             size="small"
//                         />
//                     )}
//                 </Paper>
//             </Container>

//             {/* --- Status Messages --- */}
//             {error && <Alert severity="error" sx={{ mb: 2, mx: 3 }}>{error}</Alert>}
//             {isLoading && (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
//                     <CircularProgress size={50} thickness={4} />
//                 </Box>
//             )}

//             {/* =========================================================
//             TAB 1: TO BE ASSIGNED (Actionable Table)
//            ========================================================= */}
//             {Bid === "1" && !isLoading && (
//                 <Container maxWidth="xl">
//                     <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
//                         <TableContainer sx={{ maxHeight: '60vh' }}>
//                             <Table stickyHeader size="medium">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell padding="checkbox" sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>
//                                             <Checkbox
//                                                 color="primary"
//                                                 indeterminate={isIndeterminate}
//                                                 checked={isAllSelected}
//                                                 onChange={handleSelectAll}
//                                                 disabled={tab1Data.length === 0}
//                                             />
//                                         </TableCell>

//                                         {dynamicColumns.map((col) => (
//                                             <TableCell key={col} sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>
//                                                 {formatHeader(col)}
//                                             </TableCell>
//                                         ))}
//                                         <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Category</TableCell>
//                                         <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Status</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>

//                                     {tab1Data.length === 0 ? (
//                                         <TableRow><TableCell colSpan={100} align="center" sx={{ py: 6, color: 'black' }}>No Available PCBs found matching your criteria.</TableCell></TableRow>
//                                     ) : (

//                                         tab1Data.map((pcb, i) => {

//                                             const uniqueId = getPcbId(pcb, i);
//                                             const isSelected = selectedIds.has(uniqueId);
//                                             return (
//                                                 <TableRow
//                                                     hover
//                                                     key={uniqueId}
//                                                     selected={isSelected}
//                                                     onClick={() => toggleSelect(uniqueId)}
//                                                     sx={{ cursor: 'pointer', '&.Mui-selected': { bgcolor: '#eff6ff' } }}
//                                                 >
//                                                     <TableCell padding="checkbox" sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                                         <Checkbox
//                                                             color="primary"
//                                                             checked={isSelected}
//                                                             onClick={(e) => { e.stopPropagation(); toggleSelect(uniqueId); }}
//                                                         />
//                                                     </TableCell>
//                                                     {dynamicColumns.map((col) => (
//                                                         <TableCell key={col} sx={{ opacity: 0.8, fontWeight: 600 }}>{pcb[col]}</TableCell>
//                                                     ))}
//                                                     <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                                         <Chip label={pcb.Type || "UNKNOWN"} size="small" sx={{ bgcolor: '#f1f5f9', fontWeight: 600 }} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                                         <Chip
//                                                             label="Ready To Assign"
//                                                             size="small"
//                                                             color="warning"
//                                                             sx={{ fontWeight: 600, bgcolor: '#fff7ed', color: '#c2410c' }}
//                                                         />
//                                                     </TableCell>
//                                                 </TableRow>
//                                             );
//                                         })
//                                     )}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                     </Paper>
//                 </Container>
//             )}

//             {/* =========================================================
//             TAB 2 & 3: ASSIGNED & COMPLETED (Read-Only Views)
//            ========================================================= */}
//             {(Bid === "2" || Bid === "3") && !isLoading && (
//                 <Container maxWidth="xl">
//                     <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
//                         <TableContainer sx={{ maxHeight: '65vh' }}>
//                             <Table stickyHeader>
//                                 {Bid === "3" ? (<TableHead>

//                                     <TableRow>

//                                         <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Serial No</TableCell>
//                                         <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Part Number</TableCell>
//                                         <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>PCB Type</TableCell>
//                                         <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Overall Status</TableCell>

//                                     </TableRow>
//                                 </TableHead>) : (
//                                     <TableHead>

//                                         <TableRow>
//                                             <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Part Number</TableCell>
//                                             <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Serial No</TableCell>

//                                             <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Current Stage</TableCell>
//                                             <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Operator</TableCell>
//                                             <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Current Stage ID</TableCell>
//                                             <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Step Status</TableCell>
//                                             <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Overall Status</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                 )




//                                 }
//                                 <TableBody>
//                                     {Bid === "2" ? (
//                                         tab2Data.length === 0 ? (
//                                             <TableRow>
//                                                 <TableCell colSpan={7} align="center" sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                                     No Active Tasks found.
//                                                 </TableCell>
//                                             </TableRow>
//                                         ) : (
//                                             tab2Data.map((row, index) => (
//                                                 <TableRow key={index} hover>
//                                                     <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>{row.partNumber}</TableCell>
//                                                     <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>{row.serialNo}</TableCell>

//                                                     <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                                         <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>{row.currentProcessName}</Typography>
//                                                     </TableCell>
//                                                     <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                                         <Stack direction="row" alignItems="center" spacing={1}>
//                                                             <PersonIcon fontSize="small" sx={{ opacity: 0.8, fontWeight: 600 }} />
//                                                             <Box>
//                                                                 {row.currentProcessOpeName ? (
//                                                                     <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                                                         {row.currentProcessOpeName + " , "}
//                                                                     </Typography>
//                                                                 ) : (
//                                                                     <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                                                         Unassigned
//                                                                     </Typography>
//                                                                 )}
//                                                                 {row.currentProcessOpeStaffno && (
//                                                                     <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                                                         ID: {row.currentProcessOpeStaffno + " , "}
//                                                                     </Typography>
//                                                                 )}
//                                                             </Box>
//                                                         </Stack>
//                                                     </TableCell>
//                                                     <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                                         <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>Stage: {row.currentStepOrder}</Typography>
//                                                     </TableCell>
//                                                     <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                                         <Chip
//                                                             label={row.currentProcessstatus || "Pending"}
//                                                             size="small"
//                                                             sx={{
//                                                                 bgcolor: row.currentProcessstatus === "Start" ? "#dbeafe" : "#f1f5f9",
//                                                                 color: row.currentProcessstatus === "Start" ? "#1e40af" : "#475569",
//                                                                 fontWeight: 600
//                                                             }}
//                                                         />
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <Chip
//                                                             label={row.Overall_PCB_status}
//                                                             size="small"
//                                                             color={row.Overall_PCB_status === "Completed" ? "success" : "default"}
//                                                             variant={row.Overall_PCB_status === "Completed" ? "filled" : "outlined"}
//                                                             sx={{ fontWeight: 600 }}
//                                                         />
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))
//                                         )
//                                     ) : (
//                                         tab3Data.length === 0 ? (
//                                             <TableRow>
//                                                 <TableCell colSpan={7} align="center" sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                                     No Completed PCBs found.
//                                                 </TableCell>
//                                             </TableRow>
//                                         ) : (
//                                             tab3Data.map((row, index) => (
//                                                 <TableRow key={index} hover>
//                                                     <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>{row.serialNo}</TableCell>
//                                                     <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>{row.partNumber}</TableCell>
//                                                     {/* <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                             <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>{row.currentProcessName}</Typography>
//                                         </TableCell> */}
//                                                     {/* <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                             <Stack direction="row" alignItems="center" spacing={1}>
//                                                 <PersonIcon fontSize="small" sx={{ opacity: 0.8, fontWeight: 600 }} />
//                                                 <Box>
//                                                     {row.currentProcessOpeName ? (
//                                                         <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                                             {row.currentProcessOpeName + " , "}
//                                                         </Typography>
//                                                     ) : (
//                                                         <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                                             Unassigned
//                                                         </Typography>
//                                                     )}
//                                                     {row.currentProcessOpeStaffno && (
//                                                         <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                                             ID: {row.currentProcessOpeStaffno + " , "}
//                                                         </Typography>
//                                                     )}
//                                                 </Box>
//                                             </Stack>
//                                         </TableCell> */}
//                                                     {/* <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                             <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>Stage: {row.currentStepOrder}</Typography>
//                                         </TableCell> */}
//                                                     <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
//                                                         <Chip
//                                                             label={row.Type || "Pending"}
//                                                             size="small"
//                                                             sx={{
//                                                                 bgcolor: row.currentProcessstatus === "Start" ? "#dbeafe" : "#f1f5f9",
//                                                                 color: row.currentProcessstatus === "Start" ? "#1e40af" : "#475569",
//                                                                 fontWeight: 600
//                                                             }}
//                                                         />
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <Chip
//                                                             label={row.Overall_PCB_status}
//                                                             size="small"
//                                                             color={row.Overall_PCB_status === "Completed" ? "success" : "default"}
//                                                             variant={row.Overall_PCB_status === "Completed" ? "filled" : "outlined"}
//                                                             sx={{ fontWeight: 600 }}
//                                                         />
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))
//                                         )
//                                     )}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                     </Paper>
//                 </Container>
//             )}






//             {/* Notifications */}
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={4000}
//                 onClose={() => setSnackbar({ ...snackbar, open: false })}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//             >
//                 <Alert variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.type} sx={{ width: '100%', borderRadius: 2 }}>
//                     {snackbar.msg}
//                 </Alert>
//             </Snackbar>

//         </Box>
//     );
// };

// export default AssignPCB;





// //Assign task Card!

// import React, { useState, useEffect, useMemo } from "react"; 
// import axios from "axios"; 
// import {
//   Box,
//   Button,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   Alert,
//   CircularProgress, 
//   TableContainer,
//   Checkbox,
//   Stack,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Chip,
//   Snackbar, 
//   Container,
//   Grid,
//   ButtonGroup
// } from "@mui/material";
// import RefreshIcon from "@mui/icons-material/Refresh"; 
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'; 
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import PersonIcon from '@mui/icons-material/Person';
// import { useSelector } from "react-redux";

// // Configuration
// const API_BASE_URL = "http://192.168.0.20:8082/api/pcb";
// const API_BASE_URL_ASSIGN = "http://192.168.0.20:2000/supervisor/assign";
// // Note: You might want to make the staff_no dynamic based on logged in user later

// // Filter Categories
// const FILTER_CATEGORIES = [
//   "All",
//   "HEXA-CHILD",
//   "HEXA-MAIN",
//   "OCTA-CHILD",
//   "OCTA-MAIN"
// ];

// const BUTTON_OPTS = [
//   { id: "1", name: "TO BE ASSIGNED", icon: <ListAltIcon /> },
//   { id: "2", name: "ASSIGNED", icon: <AssignmentIcon /> },
// ];

// function AssignPCB() {

//     // Tab 1 Data
//     const [dbPCBs, setDbPCBs] = useState([]); 

//     // Tab 2 Data
//     const [assignedPCBs, setAssignedPCBs] = useState([]);

//     const [isLoading, setIsLoading] = useState(false); 
//     const [error, setError] = useState(null); 

//     // Selection and Filter States
//     const [selectedIds, setSelectedIds] = useState(new Set()); 
//     const [filterCategory, setFilterCategory] = useState("All"); 





//   const configDetails = useSelector(state => state.MROTDataSavingReducer.configDetails)



//   var API1 = "/supervisor/assign"

//   var API2 = "/api/pcb/filter?status=Inaction"


//   var API3 = "/supervisor/view"

//   var PythonServer = "http://127.0.0.1:2000" + API1

//   var PythonServerViewandAssigned = "http://192.168.0.20:2000" + API3

//   var NodeServerIP = "http://192.168.0.20:8082" + API2


//   if (configDetails != undefined) {

//     console.log("configDetails",configDetails)

//     if (configDetails.project[0].ServerIP != undefined) {
//         console.log("configDetails.project[0].ServerIP ",configDetails.project[0].ServerIP)
//       if (configDetails.project[0].ServerIP[0].PythonServerIP != undefined) {

//         PythonServer = configDetails.project[0].ServerIP[0].PythonServerIP + API1


//         PythonServerViewandAssigned = configDetails.project[0].ServerIP[0].PythonServerIP + API3


//         NodeServerIP = configDetails.project[0].ServerIP[0].NodeServerIP + API2
//       }



//     }

//   }




//     // Active Tab State
//     const [Bid, SetBid] = React.useState("1");

//     function dataSelection(id) {
//       SetBid(id);
//       setError(null); // Clear errors when switching tabs
//     }

//     // Notification State
//     const [snackbar, setSnackbar] = useState({ open: false, msg: "", type: "info" });

//     // ==========================================
//     // FETCH EFFECTS
//     // ==========================================

//     // Trigger fetch whenever the Tab (Bid) changes
//     useEffect(() => {
//         if (Bid === "1") {
//             fetchInactionPCBs();
//         } else if (Bid === "2") {
//             fetchAssignedPCBs();
//         }
//     }, [Bid]);

//     // 1. Fetch "TO BE ASSIGNED" (Inaction)
//     const fetchInactionPCBs = async () => {
//         setIsLoading(true);
//         setError(null);
//         setSelectedIds(new Set()); 
//         try {
//           const response = await fetch(NodeServerIP);

//           if (!response.ok) {
//             throw new Error("Failed to fetch data from database");
//           }

//           const data = await response.json();

//           const processItem = (item) => {
//             let compositeType = item.Type;
//             if (!compositeType && item.type && item.source) {
//                  compositeType = `${item.type}-${item.source}`.toUpperCase();
//             }
//             return compositeType || "UNKNOWN";
//           };

//           const processedData = data.map(item => ({
//               ...item,
//               Type: processItem(item)
//           }));

//           setDbPCBs(processedData); 
//         } catch (err) {
//           console.error("Error fetching PCBs:", err);
//           setError(err.message);
//           setDbPCBs([]); 
//         } finally {
//           setIsLoading(false);
//         }
//     };
//     let user = JSON.parse(localStorage.getItem("user"));
//     // 2. Fetch "ASSIGNED" (Supervisor View)
//     const fetchAssignedPCBs = async () => {
//         setIsLoading(true);


//         setError(null);

//         const requestParams = { staff_no: user?.id };
//         try {
//             const response = await axios.get(PythonServerViewandAssigned,{ params: requestParams });
//             console.log("response.data",response.data)
//             // The API returns an object with a 'pcbs' array
//             if (response.data && response.data.pcbs) {

//                 console.log("response.data",response.data)
//                 setAssignedPCBs(response.data.pcbs);
//             } else {
//                 setAssignedPCBs([]);
//             }
//         } catch (err) {
//             console.error("Error fetching Assigned PCBs:", err);
//             setError("Failed to load assigned tasks.");
//             setAssignedPCBs([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // ==========================================
//     // ASSIGN LOGIC
//     // ==========================================
//     const handleAssign = async () => {
//       if (selectedIds.size === 0) return;

//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user) {
//           setSnackbar({ open: true, msg: "User details not found. Please log in.", type: "error" });
//           return;
//       }

//       const selectedItems = dbPCBs.filter((pcb, index) => {
//           const id = getPcbId(pcb, index);
//           return selectedIds.has(id);
//       });

//       const payload = {
//           supervisor_staff_no: user?.id,
//           pcb_serial_parts: selectedItems.map(item => item.PCBserialNoPartNumber)
//       };
//       console.log("pcb_serial_parts: ",payload.pcb_serial_parts)
//       try {
//           await axios.post(
//             PythonServer, 
//               null, 
//               { params: payload }
//           );

//           setSnackbar({ open: true, msg: `Successfully assigned ${selectedItems.length} PCBs.`, type: "success" });
//           // Refresh the list after assignment
//           fetchInactionPCBs(); 
//       } catch (err) {
//           console.error("Assign Error:", err);
//           setSnackbar({ open: true, msg: "Failed to assign work. Check server logs.", type: "error" });
//       }
//   };

//     // ==========================================
//     // FILTERING LOGIC (For Tab 1)
//     // ==========================================
//     const visiblePCBs = useMemo(() => {
//         if (filterCategory === "All") return dbPCBs;
//         return dbPCBs.filter((pcb) => pcb.Type === filterCategory);
//     }, [dbPCBs, filterCategory]);

//     // ==========================================
//     // SELECTION HANDLERS
//     // ==========================================

//     const getPcbId = (pcb, index) => pcb.serialNo || pcb.serialNumber || pcb._pcb_key_id || `unknown-${index}`;

//     const handleSelectAll = (e) => {
//         const isChecked = e.target.checked;
//         const newSelected = new Set(selectedIds);

//         visiblePCBs.forEach((pcb, i) => {
//             const id = getPcbId(pcb, i);
//             if (isChecked) {
//                 newSelected.add(id);
//             } else {
//                 newSelected.delete(id);
//             }
//         });
//         setSelectedIds(newSelected);
//     };

//     const toggleSelect = (id) => {
//         const newSelected = new Set(selectedIds);
//         if (newSelected.has(id)) {
//             newSelected.delete(id);
//         } else {
//             newSelected.add(id);
//         }
//         setSelectedIds(newSelected);
//     };

//     // ==========================================
//     // HELPER: Base Columns for Tab 1
//     // ==========================================
//     const firstItem = dbPCBs[0];
//     const HIDDEN_FIELDS = [
//       "id", "linkedOperations", "isWorkAssigned", "_pcb_key_id", 
//       "_id", "__v", "Type", "source", "type",
//       "salary", "password" ,"PCBserialNoPartNumber","quantity","userID","userName","userRole","userSBU","userSBUDIV","updatedAt","createdAt","status"
//     ];

//     const baseColumns = firstItem 
//       ? Object.keys(firstItem).filter((k) => !HIDDEN_FIELDS.includes(k))
//       : [];

//     const isAllSelected = visiblePCBs.length > 0 && visiblePCBs.every((pcb, i) => {
//         return selectedIds.has(getPcbId(pcb, i));
//     });

//     const isIndeterminate = visiblePCBs.some((pcb, i) => selectedIds.has(getPcbId(pcb, i))) && !isAllSelected;

//     return (
//       <Box sx={{ maxWidth: "100%", mx: "auto" }}>

//         {/* 1. PROFESSIONAL BUTTONS SECTION */}
//         <Container sx={{ mt: 3, mb: 3 }}>
//             <Paper elevation={3} sx={{ borderRadius: '50px', width: 'fit-content', mx: 'auto', p: 0.5, bgcolor: '#f5f5f5' }}>
//                 <Stack direction="row" spacing={1}>
//                     {BUTTON_OPTS.map((item) => {
//                         const isActive = Bid === item.id;
//                         return (
//                             <Button
//                                 key={item.id}
//                                 onClick={() => dataSelection(item.id)}
//                                 variant={isActive ? "contained" : "text"}
//                                 startIcon={item.icon}
//                                 sx={{
//                                     borderRadius: '50px',
//                                     px: 4,
//                                     py: 1,
//                                     fontWeight: 'bold',
//                                     textTransform: 'none',
//                                     transition: 'all 0.3s ease',
//                                     backgroundColor: isActive ? 'primary.main' : 'transparent',
//                                     color: isActive ? 'white' : 'black',
//                                     boxShadow: isActive ? 4 : 0,
//                                     '&:hover': {
//                                         backgroundColor: isActive ? 'primary.dark' : 'rgba(0,0,0,0.05)',
//                                     }
//                                 }}
//                             >
//                                 {item.name}
//                             </Button>
//                         )
//                     })}
//                 </Stack>
//             </Paper>
//         </Container>

//         {/* Error Display */}
//         {error && (
//             <Alert severity="error" sx={{ mb: 2, mx: 2 }}>{error}</Alert>
//         )}

//         {/* Loading Display */}
//         {isLoading && (
//             <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
//                 <CircularProgress />
//             </Box>
//         )}

//         {/* ==============================================
//             TAB 1: TO BE ASSIGNED (Interactive Table)
//             ==============================================
//         */}
//         {Bid === "1" && !isLoading && (
//             <>
//                 {/* Header with Filter, Refresh AND Assign Button */}
//                 <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Stack direction="row" spacing={2} alignItems="center">
//                         <Typography variant="h6" color="primary">Inaction / Available PCBs</Typography>

//                         <FormControl size="small" sx={{ minWidth: 180 }}>
//                             <InputLabel>Filter Category</InputLabel>
//                             <Select
//                                 value={filterCategory}
//                                 label="Filter Category"
//                                 onChange={(e) => setFilterCategory(e.target.value)}
//                             >
//                                 {FILTER_CATEGORIES.map((cat) => (
//                                     <MenuItem key={cat} value={cat}>{cat}</MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Stack>

//                     <Stack direction="row" spacing={2} alignItems="center">
//                         {selectedIds.size > 0 && (
//                             <Chip label={`${selectedIds.size} Selected`} color="primary" variant="outlined" />
//                         )}

//                         <Button 
//                             variant="contained" 
//                             color="secondary" 
//                             startIcon={<AssignmentTurnedInIcon />}
//                             disabled={selectedIds.size === 0}
//                             onClick={handleAssign}
//                         >
//                             Assign Work
//                         </Button>
//                     </Stack>
//                 </Paper>

//                 {dbPCBs.length === 0 ? (
//                 <Paper sx={{ p: 5, textAlign: "center", borderRadius: 3 }}>
//                     <Typography variant="body1" color="black">No PCBs found with status "Inaction".</Typography>
//                 </Paper>
//                 ) : (
//                 <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 3, boxShadow: 2 }}>
//                     <TableContainer sx={{ maxHeight: '65vh' }}>
//                     <Table stickyHeader size="small">
//                         <TableHead>
//                         <TableRow>
//                             <TableCell padding="checkbox" sx={{ bgcolor: "#f1f5f9" }}>
//                                 <Checkbox
//                                     color="primary"
//                                     indeterminate={isIndeterminate}
//                                     checked={isAllSelected}
//                                     onChange={handleSelectAll}
//                                     disabled={visiblePCBs.length === 0}
//                                 />
//                             </TableCell>

//                             {baseColumns.map((col) => (
//                             <TableCell key={col} sx={{ fontWeight: "bold", bgcolor: "#f1f5f9" }}>
//                                 {col.toUpperCase()}
//                             </TableCell>
//                             ))}
//                             <TableCell sx={{ fontWeight: "bold", bgcolor: "#f1f5f9" }}>TYPE</TableCell>
//                             <TableCell sx={{ fontWeight: "bold", bgcolor: "#f1f5f9" }}>STATUS</TableCell>
//                         </TableRow>
//                         </TableHead>
//                         <TableBody>
//                         {visiblePCBs.map((pcb, i) => {
//                             const uniqueId = pcb.serialNo || pcb.serialNumber || pcb._pcb_key_id || `unknown-${i}`;
//                             const isSelected = selectedIds.has(uniqueId);

//                             return (
//                             <TableRow 
//                                 hover 
//                                 key={uniqueId} 
//                                 selected={isSelected} 
//                                 onClick={() => toggleSelect(uniqueId)} 
//                                 sx={{ cursor: 'pointer' }}
//                             >
//                                 <TableCell padding="checkbox">
//                                     <Checkbox
//                                         color="primary"
//                                         checked={isSelected}
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             toggleSelect(uniqueId);
//                                         }}
//                                     />
//                                 </TableCell>

//                                 {baseColumns.map((col) => (
//                                 <TableCell key={col}>
//                                     {pcb[col]}
//                                 </TableCell>
//                                 ))}

//                                 <TableCell>
//                                     <Chip label={pcb.Type || "UNKNOWN"} size="small" variant="outlined" />
//                                 </TableCell>

//                                 <TableCell>
//                                 <Chip 
//                                     label={pcb.isWorkAssigned ? "ASSIGNED" : "PENDING"} 
//                                     color={pcb.isWorkAssigned ? "success" : "warning"}
//                                     size="small"
//                                     variant="filled"
//                                 />
//                                 </TableCell>
//                             </TableRow>
//                             );
//                         })}
//                         </TableBody>
//                     </Table>
//                     </TableContainer>
//                 </Paper>
//                 )}
//             </>
//         )}

//         {/* ==============================================
//             TAB 2: ASSIGNED (Read-Only Table)
//             ==============================================
//         */}
//         {Bid === "2" && !isLoading && (
//             <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 3, boxShadow: 2, mt: 2 }}>
//                 {assignedPCBs.length === 0 ? (
//                     <Box sx={{ p: 5, textAlign: "center" }}>
//                         <Typography variant="body1" color="black">No assigned tasks found.</Typography>
//                     </Box>
//                 ) : (
//                     <TableContainer sx={{ maxHeight: '70vh' }}>
//                         <Table stickyHeader>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell sx={{ bgcolor: "#e3f2fd", fontWeight: 'bold' }}>SERIAL NO</TableCell>
//                                     <TableCell sx={{ bgcolor: "#e3f2fd", fontWeight: 'bold' }}>PART NUMBER</TableCell>
//                                     <TableCell sx={{ bgcolor: "#e3f2fd", fontWeight: 'bold' }}>PRESENT STEP</TableCell>
//                                     <TableCell sx={{ bgcolor: "#e3f2fd", fontWeight: 'bold' }}>PRESENT PROCESS NAME</TableCell>
//                                     <TableCell sx={{ bgcolor: "#e3f2fd", fontWeight: 'bold' }}>PRESENT OPERATOR</TableCell>
//                                     <TableCell sx={{ bgcolor: "#e3f2fd", fontWeight: 'bold' }}>TASK COMPLETED</TableCell>
//                                     <TableCell sx={{ bgcolor: "#e3f2fd", fontWeight: 'bold' }}>PROCESS STATUS</TableCell>
//                                     <TableCell sx={{ bgcolor: "#e3f2fd", fontWeight: 'bold' }}>OVERALL STATUS</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {assignedPCBs.map((row, index) => (
//                                     <TableRow key={index} hover>
//                                         <TableCell>{row.serialNo}</TableCell>
//                                         <TableCell>{row.partNumber}</TableCell>
//                                         <TableCell>{row.currentStepOrder}</TableCell>
//                                         <TableCell>
//                                             <Chip 
//                                                 label={row.currentProcessName} 
//                                                 size="small" 
//                                                 color="primary" 
//                                                 variant="outlined"
//                                             />
//                                         </TableCell>
//                                         <TableCell>
//                                             <Stack direction="row" alignItems="center" spacing={1}>
//                                                 <PersonIcon fontSize="small" color="action" />
//                                                 <Box>
//                                                     <Typography variant="body2" fontWeight="bold">
//                                                         {row.currentProcessOpeName}
//                                                     </Typography>
//                                                     <Typography variant="caption" color="black">
//                                                         {row.currentProcessOpeStaffno ||'YET TO START'}
//                                                     </Typography>
//                                                 </Box>
//                                             </Stack>
//                                         </TableCell>
//                                         <TableCell>{row.Tasks_Completed}</TableCell>
//                                         <TableCell>
//                                             <Chip 
//                                                 label={row.currentProcessstatus} 
//                                                 size="small" 
//                                                 color={row.currentProcessstatus === "Start" ? "info" : "default"} 
//                                             />
//                                         </TableCell>
//                                         <TableCell>
//                                             <Chip 
//                                                 label={row.Overall_PCB_status} 
//                                                 color="success" 
//                                                 size="small"
//                                             />
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 )}
//             </Paper>
//         )}

//         {/* NOTIFICATIONS */}
//         <Snackbar 
//             open={snackbar.open} 
//             autoHideDuration={4000} 
//             onClose={() => setSnackbar({ ...snackbar, open: false })} 
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//         >
//             <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.type} sx={{ width: '100%' }}>
//                 {snackbar.msg}
//             </Alert>
//         </Snackbar>

//       </Box>
//     );
//   };

//   export default AssignPCB;



























// AssignPCB.js - Enhanced Version
// Features: 3 Tabs, Search, Smart Column Mapping, Realistic UI

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
    Box,
    Button,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Alert,
    CircularProgress,
    TableContainer,
    Checkbox,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Snackbar,
    Container,
    TextField,
    InputAdornment,
    IconButton,
    Divider
} from "@mui/material";

// Icons
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import DoneAllIcon from '@mui/icons-material/DoneAll'; // Icon for Completed Tab
import ClearIcon from '@mui/icons-material/Clear';

import { useSelector } from "react-redux";
import { CheckCircleIcon } from "lucide-react";
import AssignmentInd from '@mui/icons-material/AssignmentInd';
import TimelineIcon from '@mui/icons-material/Timeline';
import ScheduleGanttView from "./ScheduleGanttView";   // read-only Gantt of the saved schedule

// --- Configuration & Constants ---

// Tab Definitions
// const BUTTON_OPTS = [
//   { id: "1", name: "TO BE ASSIGNED", icon: <ListAltIcon />, color: "warning" },
//   { id: "2", name: "ASSIGNED", icon: <AssignmentIcon />, color: "info" },
//   { id: "3", name: "COMPLETED", icon: <DoneAllIcon />, color: "success" }, // New Tab
// ];
const BUTTON_OPTS = [
    {
        id: "1",
        name: "TO BE ASSIGNED",
        icon: <ListAltIcon sx={{ color: '#b26a00' }} />, // Muted Deep Amber
        color: "warning"
    },
    {
        id: "2",
        name: "ASSIGNED",
        icon: <AssignmentInd sx={{ color: '#455a64' }} />, // Professional Slate
        color: "info"
    },
    {
        id: "3",
        name: "COMPLETED",
        icon: <CheckCircleIcon sx={{ color: '#2e7d32' }} />, // Rich Forest Green
        color: "success"
    },
];

// Filter Categories for Tab 1
const FILTER_CATEGORIES = [
    "All",
    "HEXA-CHILD",
    "HEXA-MAIN",
    "OCTA-CHILD",
    "OCTA-MAIN"
];

// Helper: Column Name Formatter
// Converts "camelCase" or "snake_case" or "messyDBKeys" to "Human Readable"
const formatHeader = (key) => {
    const map = {
        "PCBserialNoPartNumber": "Serial / Part No",
        "productionOrderNumber": "Prod. Order No",
        "orderNumber": "Order No",
        "createdAt": "Created Date",
        "updatedAt": "Last Updated",
        "serialNumber": "Serial No",
        "partNumber": "Part No",
        "type": "Type",
        "quantity": "Qty"
    };
    if (map[key]) return map[key];

    // Fallback: Split by capital letters and capitalize first letter
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
};

function AssignPCB() {

    // --- State Management ---

    // Data Store
    const [dbPCBs, setDbPCBs] = useState([]);       // Tab 1 Data (Inaction)
    const [assignedPCBs, setAssignedPCBs] = useState([]); // Tab 2 & 3 Data (View)

    // UI State
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [Bid, SetBid] = React.useState("1"); // Current Tab ID
    const [snackbar, setSnackbar] = useState({ open: false, msg: "", type: "info" });

    // Filter & Search State
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [filterCategory, setFilterCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState(""); // Search State
    const [ganttOpen, setGanttOpen] = useState(false);  // "View Schedule" dialog (read-only)

    // --- Redux & API Configuration (Existing Logic) ---
    const configDetails = useSelector(state => state.MROTDataSavingReducer.configDetails);

    // Default Endpoints
    var API1 = "/supervisor/assign";
    var API2 = "/api/pcb/filter?status=Inaction";
    var API3 = "/supervisor/view";

    var PythonServer = "http://127.0.0.1:2000" + API1;
    var PythonServerViewandAssigned = "http://192.168.0.20:2000" + API3;
    var NodeServerIP = "http://192.168.0.20:8082" + API2;
    // Python server that has the scheduling routes (/schedule/plans/view) - same server as /supervisor/*
    var ScheduleServer = "http://192.168.0.20:2000";

    // Dynamic IP Overwrite from Redux
    if (configDetails != undefined) {
        if (configDetails.project && configDetails.project[0].ServerIP) {
            const serverIPs = configDetails.project[0].ServerIP[0];
            if (serverIPs.PythonServerIP) {
                PythonServer = serverIPs.PythonServerIP + API1;
                // console.log("PythonServer44",PythonServer)
                PythonServerViewandAssigned = serverIPs.PythonServerIP + API3;
                NodeServerIP = serverIPs.NodeServerIP + API2;
                ScheduleServer = serverIPs.PythonServerIP;
            }
        }
    }

    // --- Tab Switching Logic ---
    function dataSelection(id) {
        SetBid(id);
        setError(null);
        setSearchQuery(""); // Reset search on tab switch
        setSelectedIds(new Set()); // Reset selection
    }

    // --- Fetch Effects ---
    useEffect(() => {
        if (Bid === "1") {
            fetchInactionPCBs();
        } else {
            // Both Tab 2 (Assigned) and Tab 3 (Completed) use the Supervisor View API
            fetchAssignedPCBs();
        }
    }, [Bid]);

    // 1. Fetch "Inaction" PCBs (Node API)
    const fetchInactionPCBs = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(NodeServerIP);
            //   console.log("resp: ",response)
            if (!response.ok) throw new Error("Failed to fetch data from database");

            const data = await response.json();
            // console.log("data: ", data);

            // Process "Type" logic from your original code
            const processedData = data.map(item => {
                let compositeType = item.Type;
                if (!compositeType && item.type && item.source) {
                    compositeType = `${item.type}-${item.source}`.toUpperCase();
                }
                return { ...item, Type: compositeType || "UNKNOWN" };
            });

            setDbPCBs(processedData);
        } catch (err) {
            //   console.error("Error fetching PCBs:", err);
            setError(err.message);
            setDbPCBs([]);
        } finally {
            setIsLoading(false);
        }
    };

    // 2. Fetch "Assigned/View" PCBs (Python API)
    const fetchAssignedPCBs = async () => {
        setIsLoading(true);
        setError(null);
        const user = JSON.parse(localStorage.getItem("user"));
        const requestParams = { staff_no: user?.id };

        try {
            const response = await axios.get(PythonServerViewandAssigned, { params: requestParams });
            // console.log("resp: ",response.data);
            if (response.data && response.data.pcbs) {
                setAssignedPCBs(response.data.pcbs);
            } else {
                setAssignedPCBs([]);
            }
        } catch (err) {
            // console.error("Error fetching Assigned PCBs:", err);
            setError("Failed to load assigned tasks.");
            setAssignedPCBs([]);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Assignment Logic (Post to Python) ---
    //     const handleAssign = async () => {
    //       if (selectedIds.size === 0) return;

    //       const user = JSON.parse(localStorage.getItem("user"));
    //       if (!user) {
    //           setSnackbar({ open: true, msg: "User details not found. Please log in.", type: "error" });
    //           return;
    //       }

    //       // Get selected items based on IDs
    //     //   console.log("dbPCBs: ",dbPCBs)
    //       const selectedItems = dbPCBs.filter((pcb, index) => {
    //         // console.log("index: ",index,"pcb: ",pcb)
    //           const id = getPcbId(pcb, index);
    //         //   console.log("id: ",id)
    //           return selectedIds.has(id);
    //       });

    //       // Payload structure
    //       const payload = {
    //           supervisor_staff_no: user?.id,
    //           pcb_serial_parts: selectedItems.map(item => item.PCBserialNoPartNumber)
    //       };
    //     //   console.log("pay load of [posting 846: ",payload)

    //       try {
    //           // Note: Your original code passed payload as params, maintaining that.
    //           console.log("payload at main: ",payload)

    //           await axios.post(PythonServer, null, { params: payload });

    //           setSnackbar({ open: true, msg: `Successfully assigned ${selectedItems.length} PCBs.`, type: "success" });
    //           setSelectedIds(new Set())
    //           fetchInactionPCBs(); // Refresh list
    //       } catch (err) {
    //         //   console.error("Assign Error:", err);
    //           setSnackbar({ open: true, msg: err.response.data.detail, type: "error" });
    //       }
    //   };

    const handleAssign = async () => {
        if (selectedIds.size === 0) return;

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            setSnackbar({ open: true, msg: "User details not found. Please log in.", type: "error" });
            return;
        }

        // Get selected items based on IDs
        const selectedItems = dbPCBs.filter((pcb, index) => {
            const id = getPcbId(pcb, index);
            return selectedIds.has(id);
        });

        // Payload structure
        const payload = {
            supervisor_staff_no: user?.id,
            pcb_serial_parts: selectedItems.map(item => item.PCBserialNoPartNumber)
        };

     
        //     try {
        //         console.log("Sending payload in body:", payload);

        //         // CORRECTED: Pass payload as the second argument. 
        //         // Do NOT use { params: payload } as that puts it in the URL.
        //         await axios.post(PythonServer, payload);

        //         setSnackbar({ open: true, msg: `Successfully assigned ${selectedItems.length} PCBs.`, type: "success" });
        //         setSelectedIds(new Set());
        //         fetchInactionPCBs(); // Refresh list
        //     } catch (err) {
        //         // Handle error response from server
        //         const errorMsg = err.response?.data?.detail || "An error occurred during assignment.";
        //         setSnackbar({ open: true, msg: errorMsg, type: "error" });
        //     }
        // };

        try {
            // Note: Your original code passed payload as params, maintaining that.
            //   console.log("payload at main: ",payload)
           // await axios.post(PythonServer, null, { params: payload });
           await axios.post(PythonServer, payload);

            setSnackbar({ open: true, msg: `Successfully assigned ${selectedItems.length} PCBs.`, type: "success" });
            setSelectedIds(new Set())
            fetchInactionPCBs(); // Refresh list
        } catch (err) {
            //   console.error("Assign Error:", err);
            const errorMsg = err.response?.data?.detail || "An error occurred during assignment.";
            setSnackbar({ open: true, msg: err.response.data.detail, type: "error" });
        }
    };

    // --- Helper: ID Generation ---
    function getPcbId(pcb, index) {
        // console.log("pcb: ",pcb)
        return pcb.PCBserialNoPartNumber || pcb._pcb_key_id || `unknown-${index}`
    }
    // const getPcbId = (pcb, index) =>pcb.serialNo || pcb.serialNumber || pcb._pcb_key_id || `unknown-${index}`  ;

    // --- Filtering Logic (Search & Categories) ---

    // Universal Filter function used by all tabs
    const filterDataBySearch = (data) => {
        if (!searchQuery) return data;
        const lowerQuery = searchQuery.toLowerCase();

        return data.filter(item => {
            // Check Serial Number
            const serial = (item.serialNo || item.serialNumber || "").toLowerCase();
            // Check Production Order
            const prodOrder = (item.productionOrderNumber || "").toLowerCase();
            // Check Order Number
            const orderNo = (item.orderNumber || "").toLowerCase();
            // Check Part Number
            const partNo = (item.partNumber || "").toLowerCase();

            return serial.includes(lowerQuery) ||
                prodOrder.includes(lowerQuery) ||
                orderNo.includes(lowerQuery) ||
                partNo.includes(lowerQuery);
        });
    };

    // 1. Visible Data for Tab 1 (Inaction)
    const tab1Data = useMemo(() => {
        let data = dbPCBs;

        // Apply Category Filter
        if (filterCategory !== "All") {
            data = data.filter((pcb) => pcb.Type === filterCategory);
        }
        // Apply Search Filter
        return filterDataBySearch(data);
    }, [dbPCBs, filterCategory, searchQuery]);

    // 2. Visible Data for Tab 2 (Assigned - In Progress)
    const tab2Data = useMemo(() => {
        // Filter for items that are NOT completed (Active, Start, Pause, etc.)
        const data = assignedPCBs.filter(pcb => pcb.Overall_PCB_status !== "COMPLETED");
        return filterDataBySearch(data);
    }, [assignedPCBs, searchQuery]);

    // 3. Visible Data for Tab 3 (Completed)
    const tab3Data = useMemo(() => {
        // Filter for items that ARE completed
        const data = assignedPCBs.filter(pcb => pcb.Overall_PCB_status === "COMPLETED");
        return filterDataBySearch(data);
    }, [assignedPCBs, searchQuery]);


    // --- Selection Handlers (Tab 1) ---
    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        const newSelected = new Set(selectedIds);
        tab1Data.forEach((pcb, i) => {
            const id = getPcbId(pcb, i);
            isChecked ? newSelected.add(id) : newSelected.delete(id);
        });
        setSelectedIds(newSelected);
    };

    const toggleSelect = (id) => {
        const newSelected = new Set(selectedIds);
        newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
        setSelectedIds(newSelected);
    };

    // Checkbox states
    const isAllSelected = tab1Data.length > 0 && tab1Data.every((pcb, i) => selectedIds.has(getPcbId(pcb, i)));
    const isIndeterminate = tab1Data.some((pcb, i) => selectedIds.has(getPcbId(pcb, i))) && !isAllSelected;


    // --- Column Logic for Tab 1 (Inaction) ---
    // This logic dynamically hides "id", "user*", and other internal fields
    const getDynamicColumns = () => {
        if (!dbPCBs.length) return [];
        const firstItem = dbPCBs[0];

        // Define Explicit Hidden Fields
        const EXPLICIT_HIDDEN = ["password", "__v", "linkedOperations", "isWorkAssigned", "Type", "PCBserialNoPartNumber", "updatedAt", "status", "productionOrder", "createdAt"];

        return Object.keys(firstItem).filter(key => {
            const lowerKey = key.toLowerCase();

            // Rule 1: Hide ID columns
            if (lowerKey === "id" || lowerKey === "_id" || lowerKey.includes("key_id")) return false;

            // Rule 2: Hide columns starting with "user"
            if (lowerKey.startsWith("user")) return false;

            // Rule 3: Hide explicit system fields
            if (EXPLICIT_HIDDEN.includes(key)) return false;

            return true;
        });
    };

    const dynamicColumns = getDynamicColumns();

    return (
        <Box sx={{ maxWidth: "100%", mx: "auto", fontFamily: 'Inter, sans-serif' }}>

            {/* --- 1. Navigation Tabs --- */}
            <Container sx={{ mt: 3, mb: 3, display: 'flex', justifyContent: 'center' }}>
                <Paper elevation={0} sx={{ borderRadius: 8, bgcolor: '#f1f5f9', p: 0.8, display: 'inline-flex', gap: 1 }}>
                    {BUTTON_OPTS.map((item) => {
                        const isActive = Bid === item.id;
                        return (
                            <Button
                                key={item.id}
                                onClick={() => dataSelection(item.id)}
                                startIcon={item.icon}
                                disableRipple // Optional: cleaner look for professional dashboards
                                sx={{
                                    borderRadius: '10px', // Sophisticated soft-square
                                    px: 2,
                                    py: 1,
                                    fontSize: '0.875rem',
                                    fontWeight: isActive ? 600 : 500,
                                    textTransform: 'none', // 'none' is more professional than 'capitalize'
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

                                    // Background handling
                                    backgroundColor: isActive ? '#ffffff' : 'transparent',
                                    color: isActive ? '#0f172a' : '#64748b',

                                    // Border and Shadow for the "Active" state
                                    border: '1px solid',
                                    borderColor: isActive ? '#e2e8f0' : 'transparent',
                                    boxShadow: isActive
                                        ? "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)"
                                        : 'none',

                                    '&:hover': {
                                        backgroundColor: isActive ? '#ffffff' : 'rgba(0, 0, 0, 0.03)',
                                        color: isActive ? '#0f172a' : '#334155',
                                        transform: isActive ? 'none' : 'translateY(-1px)',
                                    },

                                    // Style for the Start Icon specifically
                                    '& .MuiButton-startIcon': {
                                        color: isActive ? (item.id === "3" ? "#10b981" : "#6366f1") : 'inherit',
                                        marginRight: 1.5
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Typography variant="inherit">{item.name}</Typography>

                                    {/* Professional Count Badge */}
                                    <Box
                                        component="span"
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            px: 1,
                                            minWidth: '24px',
                                            height: '20px',
                                            borderRadius: '6px',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            // Visual distinction for the badge
                                            backgroundColor: isActive ? '#f1f5f9' : 'rgba(100, 116, 139, 0.1)',
                                            color: isActive ? '#475569' : '#64748b',
                                            transition: 'background-color 0.2s',
                                        }}
                                    >
                                        {item.id === "1" ? tab1Data.length : item.id === "2" ? tab2Data.length : tab3Data.length}
                                    </Box>
                                </Box>
                            </Button>
                        )
                    })}
                </Paper>
            </Container>

            {/* --- 2. Action Bar (Search & Filters) --- */}
            <Container maxWidth="xl" sx={{ mb: 3 }}>
                <Paper elevation={0} sx={{
                    p: 2,
                    borderRadius: 3,
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: 'white'
                }}>

                    {/* Left: Search Bar */}
                    <TextField
                        placeholder="Search Serial No, Order No..."
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ width: { xs: '100%', md: 350 } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: searchQuery && (
                                // <IconButton size="small" >
                                <ClearIcon fontSize="small" onClick={() => setSearchQuery("")} style={{ cursor: 'poiter' }} />
                                // </IconButton>
                            )
                        }}
                    />

                    {/* Right: Tab Specific Actions */}
                    {Bid === "1" ? (
                        <Stack direction="row" spacing={2} alignItems="center">
                            <FormControl size="small" sx={{ minWidth: 160 }}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={filterCategory}
                                    label="Category"
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                >
                                    {FILTER_CATEGORIES.map((cat) => (
                                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Divider orientation="vertical" flexItem />
                            {selectedIds.size > 0 && (
                                <Chip label={`${selectedIds.size} Selected`} color="primary" size="small" />
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AssignmentTurnedInIcon />}
                                disabled={selectedIds.size === 0}
                                onClick={handleAssign}
                                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                            >
                                Assign Selected
                            </Button>
                        </Stack>
                    ) : (
                        // Tabs 2 & 3 Status Chips (+ "View Schedule" beside "Monitoring Live Tasks")
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Chip
                                label={Bid === "2" ? "Monitoring Live Tasks" : "Archived Tasks"}
                                variant="outlined"
                                color={Bid === "2" ? "info" : "success"}
                                size="small"
                            />
                            {Bid === "2" && (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<TimelineIcon />}
                                    onClick={() => setGanttOpen(true)}
                                    sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                                >
                                    View Schedule
                                </Button>
                            )}
                        </Stack>
                    )}
                </Paper>
            </Container>

            {/* --- Status Messages --- */}
            {error && <Alert severity="error" sx={{ mb: 2, mx: 3 }}>{error}</Alert>}
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                    <CircularProgress size={50} thickness={4} />
                </Box>
            )}

            {/* =========================================================
            TAB 1: TO BE ASSIGNED (Actionable Table)
           ========================================================= */}
            {Bid === "1" && !isLoading && (
                <Container maxWidth="xl">
                    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
                        <TableContainer sx={{ maxHeight: '60vh' }}>
                            <Table stickyHeader size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox" sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>
                                            <Checkbox
                                                color="primary"
                                                indeterminate={isIndeterminate}
                                                checked={isAllSelected}
                                                onChange={handleSelectAll}
                                                disabled={tab1Data.length === 0}
                                            />
                                        </TableCell>

                                        {dynamicColumns.map((col) => (
                                            <TableCell key={col} sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>
                                                {formatHeader(col)}
                                            </TableCell>
                                        ))}
                                        <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Category</TableCell>
                                        <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {tab1Data.length === 0 ? (
                                        <TableRow><TableCell colSpan={100} align="center" sx={{ py: 6, color: 'black' }}>No Available PCBs found matching your criteria.</TableCell></TableRow>
                                    ) : (

                                        tab1Data.map((pcb, i) => {

                                            const uniqueId = getPcbId(pcb, i);
                                            const isSelected = selectedIds.has(uniqueId);
                                            return (
                                                <TableRow
                                                    hover
                                                    key={uniqueId}
                                                    selected={isSelected}
                                                    onClick={() => toggleSelect(uniqueId)}
                                                    sx={{ cursor: 'pointer', '&.Mui-selected': { bgcolor: '#eff6ff' } }}
                                                >
                                                    <TableCell padding="checkbox" sx={{ opacity: 0.8, fontWeight: 600 }}>
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isSelected}
                                                            onClick={(e) => { e.stopPropagation(); toggleSelect(uniqueId); }}
                                                        />
                                                    </TableCell>
                                                    {dynamicColumns.map((col) => (
                                                        <TableCell key={col} sx={{ opacity: 0.8, fontWeight: 600 }}>{pcb[col]}</TableCell>
                                                    ))}
                                                    <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
                                                        <Chip label={pcb.Type || "UNKNOWN"} size="small" sx={{ bgcolor: '#f1f5f9', fontWeight: 600 }} />
                                                    </TableCell>
                                                    <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
                                                        <Chip
                                                            label="Ready To Assign"
                                                            size="small"
                                                            color="warning"
                                                            sx={{ fontWeight: 600, bgcolor: '#fff7ed', color: '#c2410c' }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Container>
            )}

            {/* =========================================================
            TAB 2 & 3: ASSIGNED & COMPLETED (Read-Only Views)
           ========================================================= */}
            {(Bid === "2" || Bid === "3") && !isLoading && (
                <Container maxWidth="xl">
                    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
                        <TableContainer sx={{ maxHeight: '65vh' }}>
                            <Table stickyHeader>
                                {Bid === "3" ? (<TableHead>

                                    <TableRow>

                                        <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Serial No</TableCell>
                                        <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Part Number</TableCell>
                                        <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>PCB Type</TableCell>
                                        <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Overall Status</TableCell>

                                    </TableRow>
                                </TableHead>) : (
                                    <TableHead>

                                        <TableRow>
                                            <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Part Number</TableCell>
                                            <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Serial No</TableCell>

                                            <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Current Stage</TableCell>
                                            <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Operator</TableCell>
                                            <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Current Stage ID</TableCell>
                                            <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Step Status</TableCell>
                                            <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', fontSize: "1.15rem" }}>Overall Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                )




                                }
                                <TableBody>
                                    {Bid === "2" ? (
                                        tab2Data.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} align="center" sx={{ opacity: 0.8, fontWeight: 600 }}>
                                                    No Active Tasks found.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            tab2Data.map((row, index) => (
                                                <TableRow key={index} hover>
                                                    <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>{row.partNumber}</TableCell>
                                                    <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>{row.serialNo}</TableCell>

                                                    <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
                                                        <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>{row.currentProcessName}</Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
                                                        <Stack direction="row" alignItems="center" spacing={1}>
                                                            <PersonIcon fontSize="small" sx={{ opacity: 0.8, fontWeight: 600 }} />
                                                            <Box>
                                                                {row.currentProcessOpeName ? (
                                                                    <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>
                                                                        {row.currentProcessOpeName + " , "}
                                                                    </Typography>
                                                                ) : (
                                                                    <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>
                                                                        Unassigned
                                                                    </Typography>
                                                                )}
                                                                {row.currentProcessOpeStaffno && (
                                                                    <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>
                                                                        ID: {row.currentProcessOpeStaffno + " , "}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
                                                        <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>Stage: {row.currentStepOrder}</Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
                                                        <Chip
                                                            label={row.currentProcessstatus || "Pending"}
                                                            size="small"
                                                            sx={{
                                                                bgcolor: row.currentProcessstatus === "Start" ? "#dbeafe" : "#f1f5f9",
                                                                color: row.currentProcessstatus === "Start" ? "#1e40af" : "#475569",
                                                                fontWeight: 600
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={row.Overall_PCB_status}
                                                            size="small"
                                                            color={row.Overall_PCB_status === "Completed" ? "success" : "default"}
                                                            variant={row.Overall_PCB_status === "Completed" ? "filled" : "outlined"}
                                                            sx={{ fontWeight: 600 }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )
                                    ) : (
                                        tab3Data.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} align="center" sx={{ opacity: 0.8, fontWeight: 600 }}>
                                                    No Completed PCBs found.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            tab3Data.map((row, index) => (
                                                <TableRow key={index} hover>
                                                    <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>{row.serialNo}</TableCell>
                                                    <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>{row.partNumber}</TableCell>
                                                    {/* <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
                                            <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>{row.currentProcessName}</Typography>
                                        </TableCell> */}
                                                    {/* <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <PersonIcon fontSize="small" sx={{ opacity: 0.8, fontWeight: 600 }} />
                                                <Box>
                                                    {row.currentProcessOpeName ? (
                                                        <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>
                                                            {row.currentProcessOpeName + " , "}
                                                        </Typography>
                                                    ) : (
                                                        <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>
                                                            Unassigned
                                                        </Typography>
                                                    )}
                                                    {row.currentProcessOpeStaffno && (
                                                        <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>
                                                            ID: {row.currentProcessOpeStaffno + " , "}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Stack>
                                        </TableCell> */}
                                                    {/* <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
                                            <Typography sx={{ opacity: 0.8, fontWeight: 600 }}>Stage: {row.currentStepOrder}</Typography>
                                        </TableCell> */}
                                                    <TableCell sx={{ opacity: 0.8, fontWeight: 600 }}>
                                                        <Chip
                                                            label={row.Type || "Pending"}
                                                            size="small"
                                                            sx={{
                                                                bgcolor: row.currentProcessstatus === "Start" ? "#dbeafe" : "#f1f5f9",
                                                                color: row.currentProcessstatus === "Start" ? "#1e40af" : "#475569",
                                                                fontWeight: 600
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={row.Overall_PCB_status}
                                                            size="small"
                                                            color={row.Overall_PCB_status === "Completed" ? "success" : "default"}
                                                            variant={row.Overall_PCB_status === "Completed" ? "filled" : "outlined"}
                                                            sx={{ fontWeight: 600 }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Container>
            )}






            {/* Read-only Gantt of the saved schedule, by date range */}
            <ScheduleGanttView
                open={ganttOpen}
                onClose={() => setGanttOpen(false)}
                apiBase={ScheduleServer}
                authHeaders={() => ({ "x-access-token": localStorage.getItem("token") || "" })}
            />

            {/* Notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.type} sx={{ width: '100%', borderRadius: 2 }}>
                    {snackbar.msg}
                </Alert>
            </Snackbar>

        </Box>
    );
};

export default AssignPCB;