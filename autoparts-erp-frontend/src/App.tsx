import { useEffect, useState } from 'react';
import { getParts, createPart, Part } from './api/inventory.api';
import { Table, Typography, Layout, theme, Button, Modal, Form, Input, InputNumber, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchParts = async () => {
    setLoading(true);
    try {
      const data = await getParts();
      setParts(data);
    } catch (error) {
      console.error("Failed to fetch parts", error);
      message.error("Failed to load inventory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  // Handle Form Submission
  const handleAddPart = async (values: Part) => {
    try {
      await createPart(values);
      message.success('Part added successfully!');
      setIsModalVisible(false);
      form.resetFields(); // Clear the form
      fetchParts(); // Refresh the table
    } catch (error) {
      console.error("Failed to add part", error);
      message.error('Failed to add part. SKU might already exist.');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { 
      title: 'Selling Price', 
      dataIndex: 'sellingPrice', 
      key: 'sellingPrice',
      render: (price: number) => `Rs. ${price?.toFixed(2)}`
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
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
              Add New Part
            </Button>
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

      {/* Add Part Modal */}
      <Modal
        title="Add New Inventory Part"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null} // We will use the form's submit button instead
      >
        <Form form={form} layout="vertical" onFinish={handleAddPart}>
          <Form.Item name="sku" label="Part SKU" rules={[{ required: true, message: 'Please enter SKU' }]}>
            <Input placeholder="e.g., BRK-NS200-02" />
          </Form.Item>
          
          <Form.Item name="name" label="Part Name" rules={[{ required: true, message: 'Please enter part name' }]}>
            <Input placeholder="e.g., Rear Brake Pad" />
          </Form.Item>

          <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
            <Input placeholder="e.g., Bajaj" />
          </Form.Item>

          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input placeholder="e.g., Brakes" />
          </Form.Item>

          <Form.Item name="costPrice" label="Cost Price (Rs.)" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} step={0.01} />
          </Form.Item>

          <Form.Item name="sellingPrice" label="Selling Price (Rs.)" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} step={0.01} />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right', marginTop: '24px', marginBottom: 0 }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save Part
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export default App;