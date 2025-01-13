import { styled } from '@mui/material/styles';
import { getData } from "../helpers/localstorage";
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Slide } from '@mui/material';
import React from 'react'

// const paginatorRight = <Button type="button" icon="pi pi-download" text />;

// export const paginateOptions = {
//     rows: 10,
//     rowsPerPageOptions: [10,50,100,150,500,1000],
//     total: 0,
//     paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
//     currentPageReportTemplate: "{first} to {last} of {totalRecords}",
//     paginatorLeft: paginatorLeft, 
//     sortMode: "single",
//     resizableColumns: true,
//     lazy: true
// }

export const emptyRows = (page, rowsPerPage, rows) => {
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0
};

export function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 1);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 2);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage)));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export const rowPerPageOptions = [5, 10, 25, { label: 'All', value: -1 }];

export const drawerWidth = 240;

export const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

export const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8; 
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const keys = {
    API_TOKEN: "TOKEN",
    USER: "USER",
    PERMISSION: "PERMISSION",
    ROLE: "ROLE",
    LANGUAGE: "LANGUAGE"
}

/**
 * Notification Options
 * variant [default | error | success | warning | info]
 */
export const notificationOptions = {
    variant: 'success',
}

export const statusOptions = [
    { status: "ACTIVE", color: "success" },
    { status: "DISABLE", color: "default" },
    { status: "DELETED", color: "error" },
    { status: "PENDING", color: "warning" },
    { status: "BLOCK", color: "error" },
    { status: "COMPLETE", color: "info" }
];

export const tooltipOptions = {
   position: 'top'
}

export const auditColumns = [
    { field: "created_by", header: "Created By" },
    { field: "updated_by", header: "Updated By" },
    { field: "created_at", header: "Created At" },
    { field: "updated_at", header: "Updated At" },
    { field: "deleted_at", header: "Deleted At" },
];

export const responsiveOptions = [
    {
        breakpoint: '991px',
        numVisible: 4
    },
    {
        breakpoint: '767px',
        numVisible: 3
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
];

export const itemTemplate = (item) => {
    return <img src={item?.itemImageSrc} alt={'GSC Export'} style={{ width: '100%', minHeight: '368px', display: 'block' }} />;
}

export const thumbnailTemplate = (item) => {
    return <img width={100} height={80} src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
}

/**
 * Language / Region / Country
 */
export const countries = [
    { name: 'China', code: 'CN' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'English', code: 'UK' }
];
export const defaultLanguage = getData(keys.LANGUAGE) ? getData(keys.LANGUAGE) : countries[1];

export const renderHeader = () => {
    return (
        <span className="ql-formats">
            <select className="ql-font">
                <option value="serif"></option>
                <option value="sans-serif"></option>
                <option value="monospace"></option>
            </select>
            <select className="ql-size">
                <option value="small"></option>
                <option value="large"></option>
                <option value="huge"></option>
            </select>
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
            <button className="ql-align" aria-label="Align"></button>
            <button className="ql-color" aria-label="Color"></button>
            <button className="ql-background" aria-label="Background"></button>
            <button className="ql-list" aria-label="Ordered"></button>
            <button className="ql-script" value="sub"></button>
            <button className="ql-script" value="super"></button>
            <button className="ql-code" aria-label="Code"></button>
            <button className="ql-link" aria-label="Link"></button>
            <button className="ql-clean" aria-label="Clean"></button>
        </span>
    );
};