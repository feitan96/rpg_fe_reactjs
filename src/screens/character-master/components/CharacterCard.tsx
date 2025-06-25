import React from 'react';
import { Card, Typography, Space, Row, Col } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import type { Character } from '../types/character';
import SpritesImage from '../../../components/sprites-image/sprites-image';

const { Text } = Typography;

interface Props {
  character: Character;
  onView: (character: Character) => void;
  onEdit: (character: Character) => void;
}

const CharacterCard: React.FC<Props> = ({ character, onView, onEdit }) => {
  // Base URL for API requests
  const apiBaseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8081';

  return (
    <Card
      hoverable
      style={{ height: 400, marginBottom: 16 }}
      cover={
        <div style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5' }}>
          {character.spritePath ? (
            <SpritesImage
              src={`${apiBaseUrl}${character.spritePath}`}
              alt={`${character.name} sprite`}
              width={150}
              height={150}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <div style={{ textAlign: 'center', color: '#999' }}>No sprite</div>
          )}
        </div>
      }
      actions={[
        <EyeOutlined key="view" onClick={() => onView(character)} />,
        <EditOutlined key="edit" onClick={() => onEdit(character)} />
      ]}
    >
      <Typography.Title level={5}>{character.name}</Typography.Title>
      <Row gutter={[8, 8]}>
        <Col span={12}><Text type="secondary">Type:</Text> {character.type}</Col>
        <Col span={12}><Text type="secondary">Class:</Text> {character.classification}</Col>
        <Col span={12}><Text type="secondary">Health:</Text> {character.baseHealth}</Col>
        <Col span={12}><Text type="secondary">Attack:</Text> {character.baseAttack}</Col>
        <Col span={12}><Text type="secondary">Magic:</Text> {character.baseMagic}</Col>
        <Col span={12}><Text type="secondary">Phys Def:</Text> {character.basePhysicalDefense}</Col>
        <Col span={12}><Text type="secondary">Mag Def:</Text> {character.baseMagicalDefense}</Col>
        <Col span={12}><Text type="secondary">Speed:</Text> {character.baseSpeed}</Col>
      </Row>
    </Card>
  );
};

export default CharacterCard;