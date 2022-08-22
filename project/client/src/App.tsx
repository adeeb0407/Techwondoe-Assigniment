import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Modal, Button } from 'antd';
import React, { useState, useEffect} from 'react';
import { useMediaQuery } from 'usehooks-ts'
import Router from './Router'
import logo from './images/logo.png'
import {Link } from 'react-router-dom'
import Cookies from 'universal-cookie';


const { Header, Content, Footer, Sider } = Layout;

function getItem(label: any, key: any, icon?: any, children?: any) {
  return {
    key,
    icon,
    label,
  };
}


const App = () => {

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Are you sure you want to Logout?');

  const showModal = () => {
    setVisible(true);
  };



  const handleOk = () => {
    setModalText('Logging Out');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      cookies.remove('user_info')
      window.location.reload();
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  
  const cookies = new Cookies();
  const userProfile = cookies.get('user_info')
  console.log(userProfile); 
  let items: any;
  let item2: any;
  
  const matches = useMediaQuery('(max-width: 600px)')
  console.log(matches)
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    if(matches){
      setCollapsed(true)
    }
    console.log("cookies changed");
  },[userProfile, items, matches])
  
  if(userProfile !== undefined){
    items = [
      getItem('My Reviews', '1', <Link to ='/'><PieChartOutlined /> </Link>),
      getItem('Write a Review', '2', <Link to ='/reviewform'><DesktopOutlined /></Link>), 
    ];
    item2 = [
      getItem('Logout', '4', <UserOutlined/>),
    ]
  }else{
    items = [
      getItem('All Reviews', '1', <Link to ='/'><PieChartOutlined /> </Link>),
      getItem('Login', 'sub1', <Link to ='/login'><UserOutlined /></Link>),
    ];
  }
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value: any) => setCollapsed(value)}>
        <div className="logo" style ={{display:'flex', justifyContent: 'center'}}>
          <img src={logo} alt="" height={90}/>
          </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        
        {userProfile !== undefined &&<Menu theme="dark" defaultSelectedKeys={['3']} mode="inline" items={item2} onClick={showModal}/>}
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Router/>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Techwondoe ©2022 Created by Adeeb Shah
        </Footer>
      </Layout>
      <Modal
        title="Logout"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
            Logout
          </Button>,
        ]}
      >
        <p>{modalText}</p>
      </Modal>
    </Layout>
  );
};

export default App;