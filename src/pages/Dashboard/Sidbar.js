import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DoubleRightOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SearchOutlined,
  PlusOutlined,
  LogoutOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Input, Divider } from 'antd';

import { Link } from 'react-router-dom';
import Routes from './Routes';
import { signOut } from 'firebase/auth';
import { useAuthContext } from '../../pages/Context/AuthContext'
import { auth } from '../../config/firebase';
const { Header, Sider, Content } = Layout;
const { Search } = Input;
export default function Sidbar() {

  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { isAuth, user, dispatch } = useAuthContext()

  const HandleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" })
        window.notify("SignOut User successfuly!", "Success")
      })
      .catch((err) => {
        window.notify("Something wants wrong", "error")
      })
  }

  return (




    <Layout style={{position : "relative"}}> 
      <Sider trigger={null} collapsible collapsed={collapsed} className='bg-white p-3'>
        <div className="demo-logo-vertical" />
        <p className='ps-3 fw-bold mt-4' >Menu</p>
        {/* <Input addonBefore={<SearchOutlined />} placeholder="Search" /> */}


        <p className='ps-3 mt-4  fs-6' >Task</p>

        <Menu
          theme="light"
          mode="inline"
          style={{
            border: "none"
          }}
          defaultSelectedKeys={["/"]}


          items={[

            {
              key: '/upcoming',
              icon: <DoubleRightOutlined />,
              label: <Link to="/upcoming" className='nav-link'>Upcoming</Link>,
            },
            {
              key: '/today',
              icon: <UnorderedListOutlined />,
              label: <Link to="/today" className='nav-link'>Today</Link>,
            },
            {
              key: '/calendar',
              icon: <CalendarOutlined />,
              label: <Link to="/calender" className='nav-link'>Calender</Link>,
            },
            {
              key: '/',
              icon: <FileTextOutlined />,
              label: <Link to="/" className='nav-link'>Sticky Wall</Link>,
            },
          ]}
        />

        <Divider />


        <Menu
          theme="light"
          mode="inline"
          style={{
            border: "none"
          }}

          items={[

            {
              key: '3',
              icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
              label: <a className=' nav-link' onClick={HandleLogout} > Sign Out</a>,
            },
          ]}
        />

        <p style={{position: "absolute" , bottom : "0"}}>Developed By <b>Mateen Javed</b>.</p>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}

          />
          <span className='fs-3 fw-bold ms-2'>Sticky Wall</span>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
           
            minHeight: 280,
            background: colorBgContainer,
          }}
        >

          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
}

