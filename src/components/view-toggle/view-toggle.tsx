import React from 'react';
import { Radio } from 'antd';
import { TableOutlined, AppstoreOutlined } from '@ant-design/icons';

interface ViewToggleProps {
  view: 'table' | 'card';
  onChange: (view: 'table' | 'card') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onChange }) => {
  return (
    <Radio.Group
      value={view}
      onChange={(e) => onChange(e.target.value)}
      optionType="button"
      buttonStyle="solid"
    >
      <Radio.Button value="table"><TableOutlined /> Table</Radio.Button>
      <Radio.Button value="card"><AppstoreOutlined /> Cards</Radio.Button>
    </Radio.Group>
  );
};

export default ViewToggle;