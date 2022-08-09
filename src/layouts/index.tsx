import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import menu from '@/router/menu'
import BasicMenu from '@/components/BasicMenu'

console.log(menu, 'menu');

const { Header, Content, Sider } = Layout;

export default () => (
  <Layout className=' w-screen h-screen bg-cyan-100'>
    <Header className=' h-10 text-3xl bg-cyan-300 text-zinc-50'>
      Header
    </Header>
    <Layout className=' bg-fuchsia-600'>
      <Sider
        className="text-3xl bg-amber-600 text-zinc-50">
        <BasicMenu></BasicMenu>
      </Sider>
      <Layout>
        <Content
          className="w-auto h-auto bg-fuchsia-200"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  </Layout>
);
