export const useStatusDropdown = ()=>{
    const isStatusDropdownOpen = ref(false);
    const activeRowId = ref(-1);

    const getActiveRowId = (dipId: number) => {
        activeRowId.value = dipId;
    };
    watchEffect(() => {
        if (activeRowId.value > 0) {
            isStatusDropdownOpen.value = true;
        }
    });
    const toggleStatusDropdown = () => {
        isStatusDropdownOpen.value = !isStatusDropdownOpen.value;
    };
    return {isStatusDropdownOpen, activeRowId, getActiveRowId, toggleStatusDropdown}
}