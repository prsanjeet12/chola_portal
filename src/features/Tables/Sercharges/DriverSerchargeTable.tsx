import React, { useState, useEffect } from 'react';
import { Table, Button, Drawer, Form, Input, Select, Switch, Tag, DatePicker } from 'antd';
import type { TableColumnsType } from 'antd';
import axios from 'axios';

const { Option } = Select;

enum SurchargeCategoryType {
  Percentage = 0,
  FixedNumber = 1,
  Currency = 2,
}

enum SurchargeCalculationType {
  Plus = 0,
  Minus = 1,
  Multiply = 2,
  Divide = 3,
  Average = 4,
  Modulus = 5,
}

const SurchargeCategoryTable: React.FC<{ open: boolean }> = ({ open }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryTypeCode: SurchargeCategoryType.Percentage,
    calculationTypeCode: SurchargeCalculationType.Plus,
    description: '',
    isActive: false,
    value: 0,
    isMandatory: false,
    effectiveStartDate: null as string | null,
    effectiveEndDate: null as string | null,
  });
  const [data, setData] = useState<any[]>([]);
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    getAllSurchargeCategories();
  }, []);

  const getAllSurchargeCategories = async () => {
    try {
      const response = await axios.get('https://chola-web-app.azurewebsites.net/api/admin/all-surcharge-category', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const formattedData = response.data.map((item: any) => ({
        ...item,
        effectiveStartDate: formatDateString(item.effectiveStartDate),
        effectiveEndDate: formatDateString(item.effectiveEndDate),
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching surcharge categories:', error);
    }
  };

  const formatDateString = (dateString: string | null) => {
    if (!dateString) return 'NULL';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const showDrawer = (category: any) => {
    if (category) {
      setFormData({
        categoryName: category.categoryName,
        categoryTypeCode: category.categoryTypeCode,
        calculationTypeCode: category.calculationTypeCode,
        description: category.description,
        isActive: category.isActive,
        value: category.value,
        isMandatory: category.isMandatory,
        effectiveStartDate: category.effectiveStartDate,
        effectiveEndDate: category.effectiveEndDate,
      });
      setSelectedCategory(category);
     
    } else {
      setFormData({
        categoryName: '',
        categoryTypeCode: SurchargeCategoryType.Percentage,
        calculationTypeCode: SurchargeCalculationType.Plus,
        description: '',
        isActive: false,
        value: 0,
        isMandatory: false,
        effectiveStartDate: null,
        effectiveEndDate: null,
      });
      setSelectedCategory(null);
    }
    setIsDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerVisible(false);
    setSelectedCategory(null);
  };

  const handleFormSubmit = async () => {
    try {
      if (selectedCategory) {
        // Update logic here if needed
      } else {
        const response = await axios.post('https://chola-web-app.azurewebsites.net/api/admin/add-surcharge-category', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Surcharge category added successfully:', response.data);
      }
      onCloseDrawer();
      getAllSurchargeCategories();
    } catch (error) {
      console.error('Error adding surcharge category:', error);
    }
  };

  const columns: TableColumnsType<any> = [
    {
      title: 'Surcharge Category ID',
      dataIndex: 'surchargeCategoryId',
      key: 'surchargeCategoryId',
     
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
      
    },
    {
      title: 'Company Code',
      dataIndex: 'companyCode',
      key: 'companyCode',
    },
    {
      title: 'Category Type',
      dataIndex: 'categoryTypeCode',
      key: 'categoryTypeCode',
     
      render: (categoryTypeCode: number) => {
        switch (categoryTypeCode) {
          case SurchargeCategoryType.Percentage:
            return 'Percentage';
          case SurchargeCategoryType.FixedNumber:
            return 'Fixed Number(ride count)';
          case SurchargeCategoryType.Currency:
            return 'Currency(Amount)';
          default:
            return '';
        }
      },
    },
    {
     title:'Default Value',
     dataIndex:'defaultValue',
     key:'defaultValue'
    },
    {
      title: 'Calculation Type',
      dataIndex: 'calculationTypeCode',
      key: 'calculationTypeCode',
      render: (calculationTypeCode: number) => {
        switch (calculationTypeCode) {
          case SurchargeCalculationType.Plus:
            return 'Plus';
          case SurchargeCalculationType.Minus:
            return 'Minus';
          case SurchargeCalculationType.Multiply:
            return 'Multiply';
          case SurchargeCalculationType.Divide:
            return 'Divide';
          case SurchargeCalculationType.Average:
            return 'Average';
          case SurchargeCalculationType.Modulus:
            return 'Modulus';
          default:
            return '';
        }
      },
    },
    {
      title: 'Is Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'success' : 'error'}>{isActive ? 'True' : 'False'}</Tag>
      ),
    },
    // {
    //   title: 'Is Mandatory',
    //   dataIndex: 'isMandatory',
    //   key: 'isMandatory',
    //   render: (isMandatory: boolean) => (
    //     <Tag color={isMandatory ? 'success' : 'error'}>{isMandatory ? 'True' : 'False'}</Tag>
    //   ),
    // },
    // {
    //   title: 'Effective Start Date',
    //   dataIndex: 'effectiveStartDate',
    //   key: 'effectiveStartDate',
    //   width: 140,
    //   fixed: 'right',
    // },
    // {
    //   title: 'Effective End Date',
    //   dataIndex: 'effectiveEndDate',
    //   key: 'effectiveEndDate',
    //   width: 140,
    //   fixed: 'right',
    // },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => showDrawer(record)}>View More</Button>
      ),
    },
  ];

  return (
    <div className={`${open ? 'w-[1200px]' : 'w-[1330px]'}`}>
      <div className="bg-white mt-16 ml-6 mr-2">
        <div className="flex justify-end">
          <button
            className="mr-8 bg-gray-950 text-white px-4 py-2 rounded-lg mt-6 hover:scale-105 transition duration-300 ease-in-out hover:bg-purple-400"
            onClick={() => showDrawer(null)}
          >
            Add New Category
          </button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          size="large"
        
          pagination={false}
          className="font-semibold font-montserrat "
   
        />
        <Drawer
          title={selectedCategory ? 'View Category Details' : 'Add New Category'}
          placement="right"
          closable={false}
          onClose={onCloseDrawer}
          visible={isDrawerVisible}
          width={500}
        >
          {selectedCategory ? (
            <div className='flex flex-col gap-y-6 font-montserrat text-[16px]'>
              <p><strong>Category Name:</strong> {selectedCategory.categoryName}</p>
              <p><strong>Description:</strong> {selectedCategory.description}</p>
              <p><strong>Default Value:</strong> {selectedCategory.defaultValue}</p>
              <p><strong>Effective Start Date:</strong> {selectedCategory.effectiveStartDate}</p>
              <p><strong>Effective End Date:</strong> {selectedCategory.effectiveEndDate}</p>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <Form
              className="font-semibold font-montserrat"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={handleFormSubmit}
              autoComplete="off"
            >
              <Form.Item label="Category Name" name="categoryName" rules={[{ required: true }]}>
                <Input
                  style={{ height: 50, width: 320 }}
                  onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Category Type" name="categoryTypeCode" rules={[{ required: true }]}>
                <Select
                  style={{ height: 50, width: 320 }}
                  onChange={(value) => setFormData({ ...formData, categoryTypeCode: value })}
                >
                  <Option value={SurchargeCategoryType.Percentage}>Percentage</Option>
                  <Option value={SurchargeCategoryType.FixedNumber}>Fixed Number</Option>
                  <Option value={SurchargeCategoryType.Currency}>Currency</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Calculation Type" name="calculationTypeCode" rules={[{ required: true }]}>
                <Select
                  style={{ height: 50, width: 320 }}
                  onChange={(value) => setFormData({ ...formData, calculationTypeCode: value })}
                >
                  <Option value={SurchargeCalculationType.Plus}>Plus</Option>
                  <Option value={SurchargeCalculationType.Minus}>Minus</Option>
                  <Option value={SurchargeCalculationType.Multiply}>Multiply</Option>
                  <Option value={SurchargeCalculationType.Divide}>Divide</Option>
                  <Option value={SurchargeCalculationType.Average}>Average</Option>
                  <Option value={SurchargeCalculationType.Modulus}>Modulus</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input.TextArea
                  style={{ height: 80, width: 340 }}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Is Active" name="isActive" valuePropName="checked">
                <Switch onChange={(checked) => setFormData({ ...formData, isActive: checked })} />
              </Form.Item>
              <Form.Item label="Is Mandatory" name="isMandatory" valuePropName="checked">
                <Switch onChange={(checked) => setFormData({ ...formData, isMandatory: checked })} />
              </Form.Item>
              <Form.Item label="Effective Start Date" name="effectiveStartDate">
                {/* <DatePicker onChange={(date, dateString) => setFormData({ ...formData, effectiveStartDate: dateString || null })} /> */}
              </Form.Item>
              <Form.Item label="Effective End Date" name="effectiveEndDate">
                {/* <DatePicker onChange={(date, dateString) => setFormData({ ...formData, effectiveEndDate: dateString || null })} /> */}
              </Form.Item>
            </Form>
          )}
          <div style={{ textAlign: 'right' }}>
            <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            {!selectedCategory && (
              <Button type="primary" onClick={handleFormSubmit}>
                Submit
              </Button>
            )}
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default SurchargeCategoryTable;