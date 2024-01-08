document.querySelectorAll(".delete-button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let id = btn.dataset.id;
        let accountRole = btn.dataset.accountRole;
        let page = btn.dataset.page;

        console.log("id: ",id);
        const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        modal.show();

        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            console.log("OK");
            deleteElement(accountRole,page,id);
            modal.hide();
        });

        document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
            console.log("Cancel");
            modal.hide();
        });
    });
});

document.querySelectorAll(".ttqc-delete-button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let locationId = btn.dataset.locationId;
        let adId = btn.dataset.adId;
        let accountRole = btn.dataset.accountRole;
        let page = btn.dataset.page;

        const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        modal.show();

        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            console.log("OK");
            deleteTTQCElement(accountRole, page, adId);
            modal.hide();
        });

        document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
            console.log("Cancel");
            modal.hide();
        });
    });
});


async function deleteTTQCElement(accountRole, page, adId) {
    let res = await fetch(`/${accountRole}/${page}/${adId}`, {
        method: "DELETE",
    });

    location.reload();
}


async function deleteElement(accountRole, page, id) {
    let res = await fetch(`/${accountRole}/${page}/${id}`, {
        method: "DELETE",
    });

    location.reload();
}