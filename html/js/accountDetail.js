document.addEventListener("DOMContentLoaded", () => {
    let urlParams = (new URL(window.location.href)).searchParams;
    if (urlParams.has("roleId"))
        document.querySelector('#roleFilter').value = urlParams.get("roleId");
});

// Filter functions
const filters = (new URL(window.location.href)).searchParams;
function roleFilter(roleId) {
    if (roleId != "all")
        filters.set("roleId", roleId);
    else
        filters.delete("roleId");
    window.location.href = "?" + filters.toString();
}