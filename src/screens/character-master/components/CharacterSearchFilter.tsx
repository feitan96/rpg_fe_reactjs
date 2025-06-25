import React, { useState } from 'react';
import { Input, Row, Col, Card, Select, Form, Button, Slider, InputNumber, Collapse } from 'antd';
import { SearchOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons';
import type { SearchFilterParams } from '../types/search-filter';
import { HEALTH_MIN, HEALTH_MAX, STAT_MIN, STAT_MAX, HealthRange, StatRange } from '../enums/statLimits';

const { Panel } = Collapse;
const { Option } = Select;

interface Props {
  loading: boolean;
  onSearch: (params: Partial<SearchFilterParams>) => void;
  types: string[];
  classifications: string[];
}

// Display names for stats
const statDisplayNames: Record<string, string> = {
  'Health': 'Health',
  'Attack': 'Attack',
  'Magic': 'Magic',
  'PhysicalDefense': 'Physical Defense',
  'MagicalDefense': 'Magical Defense',
  'Speed': 'Speed'
};

const CharacterSearchFilter: React.FC<Props> = ({ loading, onSearch, types, classifications }) => {
  const [form] = Form.useForm();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSearch = (values: any) => {
    const filters: Record<string, any> = {};

    // Copy all non-empty filter values
    Object.keys(values).forEach(key => {
      if (values[key] !== undefined && values[key] !== null && values[key] !== '') {
        filters[key] = values[key];
      }
    });

    // Extract search term
    const searchTerm = filters.searchTerm;
    delete filters.searchTerm;

    // Set min/max ranges for stats
    const stats = [
      'Health', 'Attack', 'Magic', 'PhysicalDefense', 'MagicalDefense', 'Speed'
    ];

    const rangeFilters: Record<string, any> = {};

    // Loop through each stat to set min/max filters
    stats.forEach(stat => {
      const min = filters[`min${stat}`];
      const max = filters[`max${stat}`];

      if (min !== undefined) {
        rangeFilters[`minBase${stat}`] = min;
        delete filters[`min${stat}`];
      }

      if (max !== undefined) {
        rangeFilters[`maxBase${stat}`] = max;
        delete filters[`max${stat}`];
      }
    });

    // Prepare the params for the API
    onSearch({
      searchTerm,
      filter: { ...filters, ...rangeFilters },
      sortBy: filters.sortBy || 'id',
      sortDirection: filters.sortDirection || 'asc'
    });
  };

  const handleClear = () => {
    form.resetFields();
    onSearch({
      searchTerm: '',
      filter: {},
      sortBy: 'id',
      sortDirection: 'asc'
    });
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSearch}
        initialValues={{
          sortBy: 'id',
          sortDirection: 'asc'
        }}
      >
        <Row gutter={16} align="bottom">
          <Col xs={24} sm={12} md={8} lg={8}>
            <Form.Item name="searchTerm" label="Search">
              <Input
                placeholder="Search by name"
                prefix={<SearchOutlined />}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Form.Item name="type" label="Type">
              <Select placeholder="Select type" allowClear>
                {types.map(type => (
                  <Option key={type} value={type}>{type}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Form.Item name="classification" label="Classification">
              <Select placeholder="Select classification" allowClear>
                {classifications.map(classification => (
                  <Option key={classification} value={classification}>
                    {classification}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={4} lg={4}>
            <Form.Item name="sortBy" label="Sort By">
              <Select>
                <Option value="id">ID</Option>
                <Option value="name">Name</Option>
                <Option value="baseHealth">Health</Option>
                <Option value="baseAttack">Attack</Option>
                <Option value="baseMagic">Magic</Option>
                <Option value="basePhysicalDefense">Physical Defense</Option>
                <Option value="baseMagicalDefense">Magical Defense</Option>
                <Option value="baseSpeed">Speed</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={4} lg={4}>
            <Form.Item name="sortDirection" label="Direction">
              <Select>
                <Option value="asc">Ascending</Option>
                <Option value="desc">Descending</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Collapse
          bordered={false}
          activeKey={showAdvancedFilters ? ['1'] : []}
          onChange={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <Panel
            header={
              <span>
                <FilterOutlined /> Advanced Filters
              </span>
            }
            key="1"
          >
            <Row gutter={16}>
              {['Health', 'Attack', 'Magic', 'PhysicalDefense', 'MagicalDefense', 'Speed'].map(stat => (
                <Col xs={24} md={12} lg={8} key={stat}>
                  <Card size="small" title={`${statDisplayNames[stat]} Range`} style={{ marginBottom: 16 }}>
                    <Row gutter={8}>
                      <Col span={12}>
                        <Form.Item name={`min${stat}`} label="Min">
                          <InputNumber
                            style={{ width: '100%' }}
                            min={stat === 'Health' ? HEALTH_MIN : STAT_MIN}
                            max={stat === 'Health' ? HEALTH_MAX : STAT_MAX}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name={`max${stat}`} label="Max">
                          <InputNumber
                            style={{ width: '100%' }}
                            min={stat === 'Health' ? HEALTH_MIN : STAT_MIN}
                            max={stat === 'Health' ? HEALTH_MAX : STAT_MAX}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Panel>
        </Collapse>

        <Row justify="end" gutter={16} style={{ marginTop: 16 }}>
          <Col>
            <Button
              icon={<ClearOutlined />}
              onClick={handleClear}
            >
              Clear
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              loading={loading}
              htmlType="submit"
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default CharacterSearchFilter;