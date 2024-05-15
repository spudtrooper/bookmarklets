/*
 * @Title: Chrome Extension Reload
 * @Description: Reloads a particular chrome extension
 */
(async function () {

  const getShadowRoot = (par, sel) => par.querySelector(sel).shadowRoot;

  const sleep = async (ms = 1000) => await new Promise(resolve => setTimeout(resolve, ms));

  const main = async () => {
    let extId = localStorage.getItem("id");
    if (!extId) {
      extId = prompt("Enter the id of the extension");
      localStorage.setItem("id", extId);
    }//hdimkmkakcdfphjdifjghbhgejaodpfi

    const extensionsManager = getShadowRoot(document, "extensions-manager");
    const viewManager = getShadowRoot(extensionsManager, "#viewManager");
    const slot = viewManager.querySelector("slot");
    const extensionsItemList = slot.assignedNodes()[0];
    const extensionsItem = extensionsItemList.shadowRoot.querySelector("#" + extId);
    const removeButton = extensionsItem.shadowRoot.querySelector("#removeButton");
    removeButton.click();
    const reloadButton = extensionsItem.shadowRoot.querySelector("#dev-reload-button");
    reloadButton.click();
    await sleep();
    const swBtn = extensionsItem.shadowRoot.querySelector(`a[title="service worker"]`);
    if (swBtn) {
      swBtn.click();
    }

  };

  await main();
})();
