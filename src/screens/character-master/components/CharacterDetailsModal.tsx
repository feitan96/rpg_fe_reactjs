import React from 'react';
import { Modal, Descriptions, Space, Popconfirm, message } from 'antd';
import type { Character } from '../types/character';
import { DeleteOutlined } from '@ant-design/icons';
import AppButton from '../../../components/button/button';
import SpritesImage from '../../../components/sprites-image/sprites-image';


interface Props {
  visible: boolean;
  character: Character | null;
  onClose: () => void;
  onSoftDelete: (id: number) => void;
  onHardDelete: (id: number) => void;
  onEdit: (character: Character) => void;
}

const CharacterDetailsModal: React.FC<Props> = ({ 
  visible,
  character,
  onClose,
  onSoftDelete,
  onHardDelete,
  onEdit, 
}) => {
  if (!character) return null;

  // Base URL for API requests
  const apiBaseUrl = process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:8081';

  return (
    <Modal
      open={visible}
      title="Character Details"
      onCancel={onClose}
      footer={
        <Space>
          <AppButton onClick={() => onEdit(character)}>Edit</AppButton>
          <Popconfirm
            title="Soft delete this character?"
            onConfirm={() => onSoftDelete(character.id)}
            okText="Yes"
            cancelText="No"
          >
            <AppButton danger icon={<DeleteOutlined />}>Soft Delete</AppButton>
          </Popconfirm>
          <Popconfirm
            title="Permanently delete this character?"
            onConfirm={() => onHardDelete(character.id)}
            okText="Yes"
            cancelText="No"
          >
            <AppButton danger type="primary" icon={<DeleteOutlined />}>Hard Delete</AppButton>
          </Popconfirm>
        </Space>
      }
    >
      {/* Display character sprite if available */}
      {character.spritePath && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <SpritesImage
            src={`${apiBaseUrl}${character.spritePath}`}
            alt={`${character.name} sprite`}
            width={128}
            height={128}
          />
        </div>
      )}

      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name">{character.name}</Descriptions.Item>
        <Descriptions.Item label="Description">{character.description}</Descriptions.Item>
        <Descriptions.Item label="Type">{character.type}</Descriptions.Item>
        <Descriptions.Item label="Classification">{character.classification}</Descriptions.Item>
        <Descriptions.Item label="Base Health">{character.baseHealth}</Descriptions.Item>
        <Descriptions.Item label="Base Attack">{character.baseAttack}</Descriptions.Item>
        <Descriptions.Item label="Base Magic">{character.baseMagic}</Descriptions.Item>
        <Descriptions.Item label="Base Physical Defense">{character.basePhysicalDefense}</Descriptions.Item>
        <Descriptions.Item label="Base Magical Defense">{character.baseMagicalDefense}</Descriptions.Item>
        <Descriptions.Item label="Base Speed">{character.baseSpeed}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default CharacterDetailsModal;