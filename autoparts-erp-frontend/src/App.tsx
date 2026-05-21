import { useEffect, useState } from 'react';
import { getParts } from './api/inventory.api';
import { Table, Typography, Layout, theme } from 'antd';
import type { Part } from './api/inventory.api';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const data = await getParts();
        setParts(data);
      } catch (error) {
        console.error("Failed to fetch parts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParts();
  }, []);

  // Ant Design Table Column Configuration
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { 
      title: 'Selling Price', 
      dataIndex: 'sellingPrice', 
      key: 'sellingPrice',
      render: (price: number) => `Rs. ${price.toFixed(2)}`
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', background: '#001529' }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>AutoParts ERP</Title>
      </Header>
      <Content style={{ padding: '0 48px', marginTop: '24px' }}>
        <div style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <Title level={4} style={{ margin: 0 }}>Inventory Catalog</Title>
          </div>
          
          <Table 
            dataSource={parts} 
            columns={columns} 
            rowKey="id" 
            loading={loading} 
            bordered
            pagination={{ pageSize: 10 }}
          />
        </div>
      </Content>
    </Layout>
  );
}

export default App;