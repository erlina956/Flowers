document.getElementById("shareBtn").addEventListener("click", async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: document.title,
                text: "Check out this awesome page!",
                url: window.location.href,
            });
            console.log("Content shared successfully!");
        } catch (error) {
            console.error("Error sharing content:", error);
        }
    } else {
        alert("Web Share API is not supported in your browser.");
    }
});
