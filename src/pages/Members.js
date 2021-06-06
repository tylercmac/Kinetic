import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavTop from "../components/NavTop";
import API from "../utils/API";
import DesktopNav from "../components/DesktopNav";
import desktopHome from "../images/desktop-home-inactive.png";
import desktopGroup from "../images/desktop-group-active.png";
import desktopCalendar from "../images/desktop-calendar-inactive.png";
import "./group.scss"
import NavBottom from "../components/NavBottom";
import home from "../images/home.png";
import groupsActive from "../images/groups-active.png";
import calendar from "../images/calendar.png";
import GroupBottomNav from "../components/GroupBottomNav";
import GroupDesktopNav from "../components/GroupDesktopNav";
import MemberCard from "../components/MemberCard";





function Members(props) {

  const [myUser, setMyUser] = useState()
  const [thisGroup, setThisGroup] = useState()
  const [inGroup, setInGroup] = useState(false)
  const [groupUsers, setGroupUsers] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [userGroups, setUserGroups] = useState([]);

  const history = useHistory();

  // Grabs url group id
  const { id } = useParams();
  let memberArray = [];

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      history.push('/')
    }

    API.getDashboard(token)
    .then(res => {
      setMyUser(res.data.username)
    }).catch(err => {
      console.log(err);
    })
    
    API.getOneGroup(id)
    .then(res => {
      
      // Set the group
      setThisGroup(res.data)
      // checkIfInGroup();    
      
      // Set the group users
      setGroupUsers(res.data.Users)
      
      if (checkIfInGroup()) {
        setInGroup(true);
      }
      
    })
    .catch(err => {
      console.log(err);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sees if current user is in group
  const checkIfInGroup = () => {
    if (groupUsers) {
    const amInGroup = groupUsers.filter(user => user.username === myUser);
    // console.log(amInGroup);
    return amInGroup;
    } else return false;
  }

  const groupName = (thisGroup ? thisGroup.name : "My Group")

  return (
    <div>

      <DesktopNav header="Desktop"
        homeBtn={desktopHome}
        groupBtn={desktopGroup}
        calendarBtn={desktopCalendar}
      />

      <NavTop 
        group_id={id}
        />
      <GroupDesktopNav 
        feedStatus="group-desktop-btn-inactive"
        memberStatus="group-desktop-btn-active"
        id={id}
      />
      <h1 className="feed-page-header text-center pb-4">{groupName} Members</h1>
      <div className='groupList'>
        {groupUsers ? groupUsers.map(item => (
          <MemberCard
            name={item.name}
          />
        )) : console.log('no members')}
      </div>
      <div className="nav-btm-fixed">
        <GroupBottomNav 
          feedStatus="group-nav-btn-inactive"
          memberStatus="group-nav-btn-active"
          id={id}
        />
        <NavBottom 
          homeBtn={home}
          groupsBtn={groupsActive}
          calendarBtn={calendar}
        />
      </div>
    </div>
  );
}

export default Members;