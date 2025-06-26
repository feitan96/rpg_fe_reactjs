import React, { useState, useEffect } from "react";
import { useSearchFilterCharacters } from "./hooks/useCharacter";
import CharacterTable from "./components/CharacterTable";
import CharacterGrid from "./components/CharacterGrid";
import CharacterDetailsModal from "./components/CharacterDetailsModal";
import CharacterSearchFilter from "./components/CharacterSearchFilter";
import AppButton from "../../components/button/button";
import ViewToggle from "../../components/view-toggle/view-toggle";
import CharacterCreateForm from "./components/CharacterCreateForm";
import CharacterEditModal from "./components/CharacterEditModal";
import type { Character } from "./types/character";
import { Spin, Space } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {
  createCharacter,
  updateCharacter,
  softDeleteCharacter,
  hardDeleteCharacter
} from "./services/characterService";
import axios from "axios";
import type { SearchFilterParams } from "./types/search-filter";

const CharacterMaster: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [showCreate, setShowCreate] = useState(false);
  const [viewCharacter, setViewCharacter] = useState<Character | null>(null);
  const [editCharacter, setEditCharacter] = useState<Character | null>(null);
  const [characterTypes, setCharacterTypes] = useState<string[]>([]);
  const [characterClassifications, setCharacterClassifications] = useState<string[]>([]);
  const [typesLoading, setTypesLoading] = useState(false);

  const {
    characters,
    total,
    loading,
    error,
    page,
    setPage,
    pageSize,
    updateParams,
    refreshData
  } = useSearchFilterCharacters();

  // Fetch character types and classifications on component mount
  useEffect(() => {
    const fetchTypeData = async () => {
      setTypesLoading(true);
      try {
        const [typesRes, classificationsRes] = await Promise.all([
          axios.get('/api/v1/characters/types'),
          axios.get('/api/v1/characters/classifications')
        ]);
        setCharacterTypes(typesRes.data);
        setCharacterClassifications(classificationsRes.data);
      } catch (error) {
        console.error('Error fetching character types/classifications:', error);
      } finally {
        setTypesLoading(false);
      }
    };

    fetchTypeData();
  }, []);

  // Handle search and filter changes
  const handleSearchFilterChange = (params: Partial<SearchFilterParams>) => {
    updateParams(params);
  };

  // Handle soft deletion of character
  const handleSoftDelete = async (id: number) => {
    await softDeleteCharacter(id);
    setViewCharacter(null);
    refreshData();
  };

  // Handle hard deletion of character
  const handleHardDelete = async (id: number) => {
    await hardDeleteCharacter(id);
    setViewCharacter(null);
    refreshData();
  };

  if (error) {
    return <div>Error loading characters: {error}</div>;
  }

  return (
    <div>
      <h1>Bestiary</h1>
      <Space style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <AppButton type="primary" onClick={() => setShowCreate(true)}>
          <PlusOutlined /> Create Character
        </AppButton>

        <ViewToggle view={viewMode} onChange={setViewMode} />
      </Space>

      <Spin spinning={typesLoading}>
        <CharacterSearchFilter
          loading={loading}
          onSearch={handleSearchFilterChange}
          types={characterTypes}
          classifications={characterClassifications}
        />
      </Spin>

      {viewMode === 'table' ? (
        <CharacterTable
          characters={characters}
          total={total}
          page={page}
          pageSize={pageSize}
          loading={loading}
          onPageChange={setPage}
          onView={(character: Character) => setViewCharacter(character)}
          onEdit={setEditCharacter}
        />
      ) : (
        <CharacterGrid
          characters={characters}
          total={total}
          page={page}
          pageSize={pageSize}
          loading={loading}
          onPageChange={setPage}
          onView={setViewCharacter}
          onEdit={setEditCharacter}
        />
      )}

      <CharacterCreateForm
        visible={showCreate}
        onCancel={() => setShowCreate(false)}
        onCreate={async (values) => {
          await createCharacter(values);
          setShowCreate(false);
          refreshData();
        }}
      />

      <CharacterDetailsModal
        visible={!!viewCharacter}
        character={viewCharacter}
        onClose={() => setViewCharacter(null)}
        onSoftDelete={handleSoftDelete}
        onHardDelete={handleHardDelete}
        onEdit={setEditCharacter}
      />

      <CharacterEditModal
        visible={!!editCharacter}
        character={editCharacter}
        onCancel={() => setEditCharacter(null)}
        onSave={async (values) => {
          if (editCharacter) {
            await updateCharacter(editCharacter.id, values);
            setEditCharacter(null);
            refreshData();
          }
        }}
      />
    </div>
  );
};

export default CharacterMaster;