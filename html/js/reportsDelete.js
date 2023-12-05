document.querySelectorAll(".report-delete-button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let id = btn.dataset.id;
        console.log(btn.dataset.id);

        const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        modal.show();

        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            console.log("OK");
            deleteReport(id);
            modal.hide();
        });

        document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
            console.log("Cancel");
            modal.hide();
        });
    });
});

async function deleteReport(id) {
    console.log("im in");
    let res = await fetch(`/so/baocao/${id}`, {
        method: "DELETE",
    });

    location.reload();
}