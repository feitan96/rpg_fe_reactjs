import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import type { Character } from '../types/character';
import SpritesImage from '../../../components/sprites-image/sprites-image';

const { Text } = Typography;

interface Props {
  character: Character;
  onClick: (character: Character) => void;
}

const CharacterCard: React.FC<Props> = ({ character, onClick }) => {
  // Base URL for API requests
  const apiBaseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8081';

  return (
    <Card
      hoverable
      style={{ height: 400, marginBottom: 16, cursor: 'pointer' }}
      onClick={() => onClick(character)}
      cover={
        <div style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5' }}>
          {character.spritePath ? (
            <SpritesImage
              src={`${apiBaseUrl}${character.spritePath}`}
              alt={`${character.name} sprite`}
              width={200}
              height={200}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <div style={{ textAlign: 'center', color: '#999' }}>No sprite</div>
          )}
        </div>
      }
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