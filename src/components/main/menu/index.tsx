"use client";

import { useState } from "react";
import type { MenuRecord } from "@/interfaces/main/menu";
import { MenuList } from "./list-menu";
import { AddMenuModal } from "./add-menu/add-menu-modal";
import { UpdateMenuModal } from "./update-menu/update-menu-modal";
import { DeleteMenuModal } from "./delete-menu/delete-menu-modal";
import { MenuViewModal } from "./view-menu/menu-view-modal";

function Menu() {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [editMenuSlug, setEditMenuSlug] = useState<string | null>(null);
  const [deleteMenu, setDeleteMenu] = useState<{ slug: string; title: string } | null>(null);
  const [viewMenuSlug, setViewMenuSlug] = useState<string | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  function handleView(item: MenuRecord) {
    setViewMenuSlug(item.slug);
    setIsViewOpen(true);
  }

  function handleEdit(item: MenuRecord) {
    setEditMenuSlug(item.slug);
  }

  function handleDelete(item: MenuRecord) {
    setDeleteMenu({ slug: item.slug, title: item.title });
  }

  return (
    <>
      <MenuList
        onAddMenu={() => setIsAddMenuOpen(true)}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddMenuModal
        open={isAddMenuOpen}
        onClose={() => setIsAddMenuOpen(false)}
        onSubmit={() => setIsAddMenuOpen(false)}
      />

      {editMenuSlug ? (
        <UpdateMenuModal
          open={!!editMenuSlug}
          slug={editMenuSlug}
          onClose={() => setEditMenuSlug(null)}
          onSubmit={() => setEditMenuSlug(null)}
        />
      ) : null}

      <DeleteMenuModal
        open={!!deleteMenu}
        slug={deleteMenu?.slug ?? null}
        title={deleteMenu?.title ?? ""}
        onClose={() => setDeleteMenu(null)}
        onDeleted={() => setDeleteMenu(null)}
      />

      <MenuViewModal
        slug={viewMenuSlug}
        isOpen={isViewOpen}
        onClose={() => {
          setIsViewOpen(false);
          setViewMenuSlug(null);
        }}
      />
    </>
  );
}

export default Menu;
