import React from 'react';
import { Modal, Descriptions, Space, Popconfirm, Row, Col } from 'antd';
import type { Character } from '../types/character';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AppButton from '../../../components/button/button';
import SpritesImage from '../../../components/sprites-image/sprites-image';
import styles from './CharacterStyles.module.css';

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

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

  // Handle edit click - close this modal first, then open edit modal
  const handleEdit = () => {
    onClose();
    setTimeout(() => {
      onEdit(character);
    }, 100);
  };

  return (
    <Modal
      open={visible}
      title="Character Details"
      onCancel={onClose}
      width={800}
      footer={
        <Space>
          <AppButton onClick={handleEdit} icon={<EditOutlined />}>Edit</AppButton>
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
      <Row gutter={24}>
        {/* Left side: Character sprite */}
        <Col xs={24} sm={10} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {character.spritePath ? (
            <SpritesImage
              src={`${apiBaseUrl}${character.spritePath}`}
              alt={`${character.name} sprite`}
              width={450}
              height={450}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <div className={styles.detailsNoSprite}>No sprite available</div>
          )}
        </Col>

        {/* Right side: Character details */}
        <Col xs={24} sm={14}>
          <Descriptions bordered column={1} size="small" style={{ marginTop: 0 }}>
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
        </Col>
      </Row>
    </Modal>
  );
};

export default CharacterDetailsModal;