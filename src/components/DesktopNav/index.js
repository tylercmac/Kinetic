import React, { useState } from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
// import MenuIcon from '@material-ui/icons/Menu';
import { MenuItem, MenuList, ClickAwayListener, Grow, Paper, Popper } from '@material-ui/core';
import kinetikLogo from "../../images/kinetik-active.png";
import desktopGroups from "../../images/desktop-groups.png";
import desktopCalendar from "../../images/desktop-calendar.png";
import DesktopAddGoalBtn from "../DesktopAddGoalBtn";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function DesktopNav(props) {

    const history = useHistory();

    const [open, setOpen] = useState(false)
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }

    const handleClose = (e) => {
        if (anchorRef.current && anchorRef.current.contains(e.target)) {
            return;
        }
        setOpen(false);
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    
    return (
        
        <div className="desktop-nav" >

            <div className="primary-navigation-left">
                <div className='kinetik-homeBtn' onClick={() => history.push('/dashboard')}><img src={kinetikLogo} alt="kinetik logo" /><p>kinetik</p></div>

                <div className='desktop-groupBtn' onClick={() => history.push('/dashboard/mygroups')}><img src={desktopGroups} alt="groups button" /><p>Groups</p></div>

                <div className='desktop-calendarBtn' onClick={() => history.push('/dashboard/mycalendar')}><img src={desktopCalendar} alt="calendar button" /><p>Calendar</p></div>
            </div>

            <div className="desktop-add-goal-center">
                <DesktopAddGoalBtn />
            </div>

            

            <div className="account-menu-right" onClick={handleToggle}>
                <AccountCircleIcon
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    color="disabled"
                    fontSize="large"
                />
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={() => {
                                            setOpen(false);
                                            history.push(`/profile/${props.username}`)
                                        }}>Profile</MenuItem>

                                        <MenuItem onClick={() => {
                                            setOpen(false);
                                            history.push('/profile/settings')
                                        }}>Settings</MenuItem>

                                        <MenuItem onClick={
                                            () => window.localStorage.clear() + window.location.reload()
                                        }>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
                <p>Account</p>
            </div>
            

        </div>
    )
}

export default DesktopNav;

//      <DesktopNav header="Desktop View" />
//<p className="desktop-header-text">{props.header}</p>