import React from 'react';
import { Row, Col, Pagination, Spin } from 'antd';
import type { Character } from '../types/character';
import CharacterCard from './CharacterCard';

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

const CharacterGrid: React.FC<Props> = ({
  characters,
  total,
  page,
  pageSize,
  loading,
  onPageChange,
  onView,
  onEdit,
}) => {
  return (
    <div>
      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          {characters.map(character => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={character.id}>
              <CharacterCard
                character={character}
                onView={onView}
                onEdit={onEdit}
              />
            </Col>
          ))}
        </Row>
      </Spin>
      <div style={{ marginTop: 40, marginBottom: 20, textAlign: 'right' }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default CharacterGrid;