import React from 'react';
import type { Character } from '../types/character';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import { Tooltip, Button, Table } from 'antd';
import styles from './CharacterStyles.module.css';

interface Props {
  characters: Character[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onView: (character: Character) => void;
  onEdit: (character: Character) => void;
}

const CharacterTable: React.FC<Props> = ({
  characters,
  total,
  page,
  pageSize,
  loading,
  onPageChange,
  onView,
  onEdit,
}) => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Classification', dataIndex: 'classification', key: 'classification' },
    { title: 'Health', dataIndex: 'baseHealth', key: 'baseHealth' },
    { title: 'Attack', dataIndex: 'baseAttack', key: 'baseAttack' },
    { title: 'Magic', dataIndex: 'baseMagic', key: 'baseMagic' },
    { title: 'Physical Defense', dataIndex: 'basePhysicalDefense', key: 'basePhysicalDefense' },
    { title: 'Magical Defense', dataIndex: 'baseMagicalDefense', key: 'baseMagicalDefense' },
    { title: 'Speed', dataIndex: 'baseSpeed', key: 'baseSpeed' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Character) => (
        <>
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => onView(record)}
              style={{ marginRight: 8 }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => onEdit(record)}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
      <>
        <div className={styles.infoText}>
          Showing {characters.length} of {total} characters
        </div>
        <Table
          dataSource={characters}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            current: page,
            pageSize,
            total,
            onChange: onPageChange,
            showSizeChanger: false,
          }}
        />
      </>
    )
};

export default CharacterTable;