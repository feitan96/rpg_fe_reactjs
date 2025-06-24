import React, { useState } from "react";
import { useCharacters, useCharactersPaginated } from "./hooks/useCharacter";
import CharacterTable from "./components/CharacterTable";
import CharacterDetailsModal from "./components/CharacterDetailsModal";
import AppButton from "../../components/button/button";
import CharacterCreateForm from "./components/CharacterCreateForm";
import CharacterEditModal from "./components/CharacterEditModal";
import type { Character } from "./types/character";

import { 
  createCharacter,
  updateCharacter,
  softDeleteCharacter,
  hardDeleteCharacter 
} from "./services/characterService";

const CharacterMaster: React.FC = () => {
  // const { characters, loading, error } = useCharacters();
  const [showCreate, setShowCreate] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [viewCharacter, setViewCharacter] = useState(null);
  const [editCharacter, setEditCharacter] = useState<Character | null>(null);
  const {
    characters,
    total,
    loading,
    error,
    page,
    setPage,
    pageSize,
  } = useCharactersPaginated(refresh);

  // Refetch characters after creation
  const refetchCharacters = () => setRefresh((r) => r + 1);

  // Handle soft deletion of character
  const handleSoftDelete = async (id: number) => {
    await softDeleteCharacter(id);
    setViewCharacter(null);
    refetchCharacters();
  };

  // Handle hard deletion of character
  const handleHardDelete = async (id: number) => {
    await hardDeleteCharacter(id);
    setViewCharacter(null);
    refetchCharacters();
  };

  return (
    <div>
      <h1>Character Master</h1>
      <AppButton type="primary" onClick={() => setShowCreate(true)}>
        Create Character
      </AppButton>
      <CharacterCreateForm
        visible={showCreate}
        onCancel={() => setShowCreate(false)}
        onCreate={async (values) => {
          await createCharacter(values);
          setShowCreate(false);
          refetchCharacters();
        }}
      />
      <CharacterTable
        characters={characters}
        total={total}
        page={page}
        pageSize={pageSize}
        loading={loading}
        onPageChange={setPage}
        onView={setViewCharacter}
        onEdit={setEditCharacter}
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
            refetchCharacters();
          }
        }}
      />
    </div>
  );
};

export default CharacterMaster;
