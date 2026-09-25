// =====================================================
// VERITYAI - SCRIPT.JS
// =====================================================



// =====================================================
// UPLOAD PAGE
// =====================================================

function chooseFile() {

    const input = document.getElementById("fileInput");

    if (input) {
        input.click();
    }

}



const fileInput = document.getElementById("fileInput");


if (fileInput) {

    fileInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) {
            return;
        }



        // =========================
        // VALIDASI FORMAT
        // =========================

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "video/mp4"
        ];


        if (!allowedTypes.includes(file.type)) {

            alert(
                "Format file tidak didukung. Gunakan JPG, PNG, atau MP4."
            );

            this.value = "";

            return;

        }



        // =========================
        // VALIDASI UKURAN 50 MB
        // =========================

        const maxSize =
            50 * 1024 * 1024;


        if (file.size > maxSize) {

            alert(
                "Ukuran file terlalu besar. Maksimal 50 MB."
            );

            this.value = "";

            return;

        }



        // =========================
        // AMBIL ELEMENT
        // =========================

        const preview =
            document.getElementById("previewContainer");


        const fileName =
            document.getElementById("fileName");


        const icon =
            document.querySelector(".upload-icon");


        const chooseButton =
            document.getElementById("chooseButton");


        const checkButton =
            document.getElementById("checkButton");



        // Saat sedang membaca file,
        // tombol masih belum bisa ditekan

        if (checkButton) {
            checkButton.disabled = true;
        }



        // Bersihkan preview lama

        if (preview) {
            preview.innerHTML = "";
        }



        // Tampilkan nama file

        if (fileName) {

            fileName.textContent =
                "📁 " + file.name;

        }



        // =========================
        // SIMPAN FILE KE LOCALSTORAGE
        // =========================

        const reader =
            new FileReader();


        reader.onload = function (event) {

            localStorage.setItem(
                "uploadedFile",
                event.target.result
            );


            localStorage.setItem(
                "fileName",
                file.name
            );


            localStorage.setItem(
                "fileType",
                file.type
            );



            // Setelah file benar-benar selesai
            // dibaca, tombol Cek Sekarang aktif

            if (checkButton) {

                checkButton.disabled = false;

            }

        };


        reader.readAsDataURL(file);



        // =========================
        // SEMBUNYIKAN ICON & PILIH FILE
        // =========================

        if (icon) {
            icon.style.display = "none";
        }


        if (chooseButton) {
            chooseButton.style.display = "none";
        }



        // =========================
        // BUAT PREVIEW
        // =========================

        const wrapper =
            document.createElement("div");


        wrapper.className =
            "preview-wrapper";



        let media;


        const objectURL =
            URL.createObjectURL(file);



        if (file.type.startsWith("image/")) {

            media =
                document.createElement("img");


            media.src =
                objectURL;


            media.alt =
                "Preview file yang dipilih";

        }

        else {

            media =
                document.createElement("video");


            media.src =
                objectURL;


            media.controls =
                true;

        }



        media.className =
            "preview-media";


        wrapper.appendChild(media);



        // =========================
        // TOMBOL X / HAPUS
        // =========================

        const removeButton =
            document.createElement("button");


        removeButton.type =
            "button";


        removeButton.innerHTML =
            "×";


        removeButton.className =
            "remove-btn";


        removeButton.setAttribute(
            "aria-label",
            "Hapus file"
        );



        removeButton.addEventListener(
            "click",
            function () {

                // hapus file input

                fileInput.value = "";



                // hapus preview

                if (preview) {
                    preview.innerHTML = "";
                }



                // hapus nama

                if (fileName) {
                    fileName.textContent = "";
                }



                // tampilkan icon kembali

                if (icon) {
                    icon.style.display = "flex";
                }



                // tampilkan Pilih File kembali

                if (chooseButton) {
                    chooseButton.style.display = "block";
                }



                // hapus penyimpanan

                localStorage.removeItem(
                    "uploadedFile"
                );


                localStorage.removeItem(
                    "fileName"
                );


                localStorage.removeItem(
                    "fileType"
                );


                localStorage.removeItem(
                    "aiScore"
                );



                // tombol Cek Sekarang mati lagi

                if (checkButton) {
                    checkButton.disabled = true;
                }



                URL.revokeObjectURL(
                    objectURL
                );

            }
        );



        wrapper.appendChild(
            removeButton
        );



        if (preview) {

            preview.appendChild(
                wrapper
            );

        }

    });

}



// =====================================================
// BUTTON CEK SEKARANG
// =====================================================

function goAnalysis() {

    const input =
        document.getElementById("fileInput");


    const checkButton =
        document.getElementById("checkButton");



    if (
        !input ||
        !input.files ||
        !input.files[0]
    ) {

        alert(
            "Silakan pilih file terlebih dahulu."
        );

        return;

    }



    const savedFile =
        localStorage.getItem(
            "uploadedFile"
        );


    if (!savedFile) {

        alert(
            "File masih diproses. Tunggu sebentar lalu coba lagi."
        );

        return;

    }



    // cegah double click

    if (checkButton) {

        checkButton.disabled = true;

        checkButton.textContent =
            "Memproses...";

    }



    window.location.href =
        "analysis.html";

}



// Kalau HTML tidak memakai onclick,
// JS otomatis memasang event click

const checkButton =
    document.getElementById(
        "checkButton"
    );


if (
    checkButton &&
    !checkButton.hasAttribute("onclick")
) {

    checkButton.addEventListener(
        "click",
        goAnalysis
    );

}



// =====================================================
// SIMULASI SKOR DETEKSI AI
// =====================================================
//
// CATATAN:
// Ini masih simulasi untuk prototype,
// belum merupakan model AI detector sungguhan.
// =====================================================

function detectAI(name) {

    if (!name) {
        return 20;
    }


    const lowerName =
        name.toLowerCase();



    if (
        lowerName.includes("ai") ||
        lowerName.includes("generated") ||
        lowerName.includes("midjourney") ||
        lowerName.includes("stable")
    ) {

        return Math.floor(
            Math.random() * 20 + 75
        );

    }



    return Math.floor(
        Math.random() * 25
    );

}



// =====================================================
// HELPER PREVIEW MEDIA
// =====================================================

function showStoredMedia(
    element,
    savedFile
) {

    if (!element || !savedFile) {
        return;
    }



    // FOTO

    if (
        savedFile.startsWith(
            "data:image/"
        )
    ) {

        element.src =
            savedFile;

        return;

    }



    // VIDEO

    if (
        savedFile.startsWith(
            "data:video/"
        )
    ) {

        const video =
            document.createElement(
                "video"
            );


        video.src =
            savedFile;


        video.controls =
            true;


        video.className =
            element.className;


        video.style.objectFit =
            "cover";


        element.replaceWith(
            video
        );

    }

}



// =====================================================
// ANALYSIS PAGE
// =====================================================

const previewImage =
    document.getElementById(
        "previewImage"
    );


if (previewImage) {

    const savedFile =
        localStorage.getItem(
            "uploadedFile"
        );


    showStoredMedia(
        previewImage,
        savedFile
    );

}



const progress =
    document.getElementById(
        "progress"
    );


const percent =
    document.getElementById(
        "percent"
    );


const analysisText =
    document.getElementById(
        "analysisText"
    );


const processText =
    document.getElementById(
        "process-text"
    );


const circleProgress =
    document.querySelector(
        ".circle-progress"
    );



if (progress && percent) {

    let value = 0;


    const timer =
        setInterval(
            function () {

                value++;



                // progress horizontal

                progress.style.width =
                    value + "%";



                // angka persen

                percent.textContent =
                    value + "%";



                // lingkaran ikut bergerak

                if (circleProgress) {

                    const degrees =
                        value * 3.6;


                    circleProgress.style.background =
                        `conic-gradient(
                            #1769aa 0deg,
                            #1769aa ${degrees}deg,
                            #e7f1ff ${degrees}deg,
                            #e7f1ff 360deg
                        )`;

                }



                // =========================
                // TEXT LOADING
                // =========================

                if (analysisText) {

                    if (value < 25) {

                        analysisText.textContent =
                            "Memeriksa detail visual...";

                    }

                    else if (value < 50) {

                        analysisText.textContent =
                            "Menganalisis pencahayaan dan kontras...";

                    }

                    else if (value < 75) {

                        analysisText.textContent =
                            "Menganalisis pola dan tekstur...";

                    }

                    else if (value < 95) {

                        analysisText.textContent =
                            "Mengecek indikasi konten AI...";

                    }

                    else {

                        analysisText.textContent =
                            "Menyusun hasil pemeriksaan...";

                    }

                }



                if (processText) {

                    if (value < 35) {

                        processText.textContent =
                            "Memeriksa detail tekstur dan pencahayaan...";

                    }

                    else if (value < 70) {

                        processText.textContent =
                            "Membandingkan karakteristik visual...";

                    }

                    else {

                        processText.textContent =
                            "Menyiapkan ringkasan hasil...";

                    }

                }



                // =========================
                // SELESAI
                // =========================

                if (value >= 100) {

                    clearInterval(
                        timer
                    );


                    const name =
                        localStorage.getItem(
                            "fileName"
                        );


                    const aiScore =
                        detectAI(name);


                    localStorage.setItem(
                        "aiScore",
                        String(aiScore)
                    );



                    setTimeout(
                        function () {

                            window.location.href =
                                "result.html";

                        },
                        600
                    );

                }

            },
            50
        );

}



// =====================================================
// RESULT PAGE
// =====================================================

const resultImage =
    document.getElementById(
        "resultImage"
    );


if (resultImage) {

    const savedFile =
        localStorage.getItem(
            "uploadedFile"
        );


    showStoredMedia(
        resultImage,
        savedFile
    );

}



const score =
    document.getElementById(
        "score"
    );


const resultProgress =
    document.getElementById(
        "resultProgress"
    );


const resultBadge =
    document.getElementById(
        "resultBadge"
    );


const naturalScore =
    document.getElementById(
        "naturalScore"
    );


const aiScoreText =
    document.getElementById(
        "aiScoreText"
    );


const resultStatus =
    document.getElementById(
        "resultStatus"
    );



if (score) {

    let aiScore =
        Number(
            localStorage.getItem(
                "aiScore"
            )
        );



    if (
        Number.isNaN(aiScore)
    ) {

        aiScore = 20;

    }



    aiScore =
        Math.max(
            0,
            Math.min(
                100,
                aiScore
            )
        );



    const natural =
        100 - aiScore;



    // angka utama

    score.textContent =
        aiScore + "%";



    // progress

    if (resultProgress) {

        requestAnimationFrame(
            function () {

                resultProgress.style.width =
                    aiScore + "%";

            }
        );

    }



    // angka bawah

    if (naturalScore) {

        naturalScore.textContent =
            natural +
            "% Konten Alami";

    }


    if (aiScoreText) {

        aiScoreText.textContent =
            aiScore +
            "% Indikasi AI";

    }



    // badge

    if (resultBadge) {

        if (aiScore >= 70) {

            resultBadge.textContent =
                "⚠️ Kemungkinan Tinggi";

        }

        else if (aiScore >= 40) {

            resultBadge.textContent =
                "⚠️ Kemungkinan Sedang";

        }

        else {

            resultBadge.textContent =
                "✓ Kemungkinan Rendah";

        }

    }



    if (resultStatus) {

        resultStatus.textContent =
            "Pemeriksaan selesai.";

    }

}



// =====================================================
// ANALISIS KARAKTERISTIK GAMBAR
// =====================================================

function analyzeUploadedImage() {

    const savedImage =
        localStorage.getItem(
            "uploadedFile"
        );



    if (!savedImage) {
        return;
    }



    // Analisis sederhana ini
    // hanya digunakan untuk foto.

    if (
        !savedImage.startsWith(
            "data:image/"
        )
    ) {

        updateVideoFactors();

        return;

    }



    const image =
        new Image();



    image.onload =
        function () {

            const canvas =
                document.createElement(
                    "canvas"
                );


            const ctx =
                canvas.getContext(
                    "2d"
                );



            canvas.width =
                120;


            canvas.height =
                120;



            ctx.drawImage(
                image,
                0,
                0,
                canvas.width,
                canvas.height
            );



            const pixels =
                ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                ).data;



            let brightnessTotal = 0;

            const brightnessValues = [];

            let textureTotal = 0;

            let previousBrightness = null;



            for (
                let i = 0;
                i < pixels.length;
                i += 4
            ) {

                const r =
                    pixels[i];


                const g =
                    pixels[i + 1];


                const b =
                    pixels[i + 2];



                const brightness =
                    (
                        r +
                        g +
                        b
                    ) / 3;



                brightnessTotal +=
                    brightness;


                brightnessValues.push(
                    brightness
                );



                if (
                    previousBrightness !==
                    null
                ) {

                    textureTotal +=
                        Math.abs(
                            brightness -
                            previousBrightness
                        );

                }



                previousBrightness =
                    brightness;

            }



            const averageBrightness =
                brightnessTotal /
                brightnessValues.length;



            let variance = 0;



            brightnessValues.forEach(
                function (value) {

                    variance +=
                        Math.pow(
                            value -
                            averageBrightness,
                            2
                        );

                }
            );



            variance /=
                brightnessValues.length;



            const contrast =
                Math.sqrt(
                    variance
                );



            const texture =
                textureTotal /
                brightnessValues.length;



            updateImageFactors(
                averageBrightness,
                contrast,
                texture
            );

        };



    image.src =
        savedImage;

}



// =====================================================
// UPDATE HASIL KARAKTERISTIK FOTO
// =====================================================

function updateImageFactors(
    brightness,
    contrast,
    texture
) {

    const title1 =
        document.getElementById(
            "factorTitle1"
        );


    const text1 =
        document.getElementById(
            "factorText1"
        );


    const title2 =
        document.getElementById(
            "factorTitle2"
        );


    const text2 =
        document.getElementById(
            "factorText2"
        );


    const title3 =
        document.getElementById(
            "factorTitle3"
        );


    const text3 =
        document.getElementById(
            "factorText3"
        );



    if (
        !title1 ||
        !text1 ||
        !title2 ||
        !text2 ||
        !title3 ||
        !text3
    ) {

        return;

    }



    // =========================
    // PENCAHAYAAN
    // =========================

    if (brightness > 190) {

        title1.textContent =
            "☀️ Pencahayaan Sangat Terang";


        text1.textContent =
            "Gambar memiliki tingkat pencahayaan yang cukup tinggi pada sebagian besar area.";

    }

    else if (brightness < 70) {

        title1.textContent =
            "🌙 Pencahayaan Cenderung Gelap";


        text1.textContent =
            "Sebagian besar gambar memiliki tingkat pencahayaan yang rendah.";

    }

    else {

        title1.textContent =
            "☀️ Pencahayaan Relatif Seimbang";


        text1.textContent =
            "Distribusi terang dan gelap pada gambar berada pada tingkat yang relatif seimbang.";

    }



    // =========================
    // KONTRAS
    // =========================

    if (contrast > 70) {

        title2.textContent =
            "◐ Kontras Visual Tinggi";


        text2.textContent =
            "Perbedaan antara area terang dan gelap terlihat cukup kuat pada gambar.";

    }

    else if (contrast < 35) {

        title2.textContent =
            "◐ Kontras Visual Rendah";


        text2.textContent =
            "Perbedaan terang dan gelap pada gambar relatif kecil dan terlihat lebih merata.";

    }

    else {

        title2.textContent =
            "◐ Kontras Visual Normal";


        text2.textContent =
            "Gambar menunjukkan variasi kontras visual pada tingkat yang umum.";

    }



    // =========================
    // TEKSTUR
    // =========================

    if (texture > 45) {

        title3.textContent =
            "🔍 Detail dan Tekstur Kompleks";


        text3.textContent =
            "Terdapat banyak perubahan detail dan tekstur pada area gambar.";

    }

    else if (texture < 18) {

        title3.textContent =
            "🔍 Tekstur Relatif Halus";


        text3.textContent =
            "Sebagian besar area gambar memiliki perubahan tekstur yang relatif sedikit.";

    }

    else {

        title3.textContent =
            "🔍 Variasi Tekstur Normal";


        text3.textContent =
            "Gambar memiliki kombinasi area halus dan detail yang cukup beragam.";

    }

}



// =====================================================
// FALLBACK UNTUK VIDEO
// =====================================================

function updateVideoFactors() {

    const title1 =
        document.getElementById(
            "factorTitle1"
        );


    const text1 =
        document.getElementById(
            "factorText1"
        );


    const title2 =
        document.getElementById(
            "factorTitle2"
        );


    const text2 =
        document.getElementById(
            "factorText2"
        );


    const title3 =
        document.getElementById(
            "factorTitle3"
        );


    const text3 =
        document.getElementById(
            "factorText3"
        );



    if (
        !title1 ||
        !text1 ||
        !title2 ||
        !text2 ||
        !title3 ||
        !text3
    ) {

        return;

    }



    title1.textContent =
        "🎞️ Media Video";


    text1.textContent =
        "Konten yang diunggah berupa file video MP4.";



    title2.textContent =
        "🔍 Pemeriksaan Visual";


    text2.textContent =
        "Prototype menampilkan hasil pemeriksaan visual dasar pada media yang diunggah.";



    title3.textContent =
        "⚙️ Analisis Konten";


    text3.textContent =
        "Analisis frame video yang lebih mendalam memerlukan sistem pemrosesan video tambahan.";

}



// Jalankan hanya di result page

if (
    document.getElementById(
        "factorTitle1"
    )
) {

    analyzeUploadedImage();

}



// =====================================================
// SCROLL REVEAL
// SATU CARD SETIAP USER SCROLL LAGI
// =====================================================

const factorCards =
    document.querySelectorAll(
        ".factor-section .factor-card"
    );


if (factorCards.length > 0) {

    let nextCard = 0;

    let previousScrollY =
        window.scrollY;


    let accumulatedScroll = 0;


    // Semakin besar angka ini,
    // semakin jauh user harus scroll
    // untuk membuka card berikutnya.

    const scrollDistance = 120;



    function revealNextCard() {

        if (
            nextCard >=
            factorCards.length
        ) {

            return;

        }



        const currentScrollY =
            window.scrollY;


        const delta =
            currentScrollY -
            previousScrollY;



        previousScrollY =
            currentScrollY;



        // Hanya hitung saat scroll ke bawah

        if (delta <= 0) {
            return;
        }



        accumulatedScroll +=
            delta;



        const card =
            factorCards[
                nextCard
            ];


        const position =
            card.getBoundingClientRect();


        const triggerPoint =
            window.innerHeight *
            0.88;



        if (
            position.top <
            triggerPoint &&
            accumulatedScroll >=
            scrollDistance
        ) {

            card.classList.add(
                "show"
            );


            nextCard++;


            accumulatedScroll = 0;

        }

    }



    window.addEventListener(
        "scroll",
        revealNextCard,
        {
            passive: true
        }
    );

}