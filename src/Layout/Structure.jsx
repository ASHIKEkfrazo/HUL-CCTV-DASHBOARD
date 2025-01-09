import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import Sidenav from './Sidenav';
import "../Styles/Layout/index.css"
import HeaderContent from './Header';
import FooterContent from './Footer';
import ClusterContextWrapper from '../ContextApi/clustercontext';
import { CamDataContextWrapper } from '../ContextApi/CamDataContext';
const { Header, Sider, Content, Footer } = Layout;

const Structure = ({ children }) => {

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (

      <ClusterContextWrapper>
        <CamDataContextWrapper>  
    <Layout className='layout' >
        <Sider trigger={null} collapsible collapsed={collapsed} >
          <Sidenav collapsed={collapsed} />
        </Sider>

      <Layout className='pl-[2px]'>
        <Header
        className={`py-4 ${!collapsed ? "h-[5.15rem]" : "h-[3rem]" } ? h-[5.15rem]`}
          style={{
            // padding: "1rem",
            background:"#06175d",
            display:"flex",
            justifyContent:"start",
            alignItems:"center",
            gap:"1rem"
          
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              color:"#fff",
              background:"#43996a"
            }}
          />
          <HeaderContent  />
        </Header>
        {/* <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        /> */}
        <Content
          style={{
            margin: '24px 16px',
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
      
          }}
        >
      
          {children}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
        </Footer>
      </Layout>
    </Layout>
    </CamDataContextWrapper>
    </ClusterContextWrapper>

  );
};
export default Structure;