import {useState} from "react";

export default function useSelectedItems(defaultValue = null){
    const [selected, setSelected] = useState(defaultValue);

    const selectAll = (event, items) => {
        if (event.target.checked) {
            const newSelecteds = items.map((n) => n.uuid);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const selection = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (uuid) => selected.indexOf(uuid) !== -1;

    return {selected, setSelected, selection, selectAll, isSelected};
}