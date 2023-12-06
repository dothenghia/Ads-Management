document.querySelectorAll(".report-delete-button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let id = btn.dataset.id;
        let accountRole = btn.dataset.accountRole;

        const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        modal.show();

        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            console.log("OK");
            deleteReport(accountRole, id);
            modal.hide();
        });

        document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
            console.log("Cancel");
            modal.hide();
        });
    });
});

async function deleteReport(accountRole, id) {
    console.log("im in");
    let res = await fetch(`/${accountRole}/baocao/${id}`, {
        method: "DELETE",
    });

    location.reload();
}