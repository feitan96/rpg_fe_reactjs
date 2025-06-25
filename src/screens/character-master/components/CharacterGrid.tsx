import React from 'react';
import { Row, Col, Pagination, Spin, Empty } from 'antd';
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
}) => {
  return (
    <div>
        <div style={{ marginBottom: 16, fontSize: '14px', color: '#666' }}>
          Showing {characters.length} of {total} characters
        </div>
      <Spin spinning={loading}>
        {characters.length > 0 ? (
          <Row gutter={[16, 16]}>
            {characters.map(character => (
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={character.id}>
                <CharacterCard
                  character={character}
                  onClick={onView}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty
            description="No characters found"
            style={{ margin: '40px 0' }}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Spin>
      <div style={{ marginTop: 8, paddingBottom: 16, display: 'flex', justifyContent: 'flex-end'}}>
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