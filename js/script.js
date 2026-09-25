// =====================================================
// VERITYAI - SCRIPT.JS
// =====================================================



// =====================================================
// UPLOAD PAGE
// =====================================================

function chooseFile() {

    const input =
        document.getElementById("fileInput");

    if (input) {
        input.click();
    }

}



const fileInput =
    document.getElementById("fileInput");


if (fileInput) {

    fileInput.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];

            if (!file) {
                return;
            }



            // =================================================
            // VALIDASI FORMAT
            // =================================================

            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "video/mp4"
            ];


            if (
                !allowedTypes.includes(
                    file.type
                )
            ) {

                alert(
                    "Format file tidak didukung. Gunakan JPG, PNG, atau MP4."
                );

                this.value = "";

                return;
            }



            // =================================================
            // VALIDASI UKURAN 50 MB
            // =================================================

            const maxSize =
                50 * 1024 * 1024;


            if (
                file.size > maxSize
            ) {

                alert(
                    "Ukuran file terlalu besar. Maksimal 50 MB."
                );

                this.value = "";

                return;
            }



            // =================================================
            // ELEMENT
            // =================================================

            const preview =
                document.getElementById(
                    "previewContainer"
                );


            const fileName =
                document.getElementById(
                    "fileName"
                );


            const icon =
                document.querySelector(
                    ".upload-icon"
                );


            const chooseButton =
                document.getElementById(
                    "chooseButton"
                );


            const checkButton =
                document.getElementById(
                    "checkButton"
                );



            // =================================================
            // MATIKAN TOMBOL SEMENTARA
            // =================================================

            if (checkButton) {

                checkButton.disabled =
                    true;

            }



            // =================================================
            // BERSIHKAN PREVIEW
            // =================================================

            if (preview) {

                preview.innerHTML =
                    "";

            }



            // =================================================
            // NAMA FILE
            // =================================================

            if (fileName) {

                fileName.textContent =
                    "📁 " + file.name;

            }



            // =================================================
            // SIMPAN FILE
            // =================================================

            const reader =
                new FileReader();


            reader.onload =
                function (event) {

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


                    // Aktifkan tombol setelah
                    // file selesai dibaca

                    if (checkButton) {

                        checkButton.disabled =
                            false;

                    }

                };


            reader.readAsDataURL(
                file
            );



            // =================================================
            // SEMBUNYIKAN ICON
            // =================================================

            if (icon) {

                icon.style.display =
                    "none";

            }


            if (chooseButton) {

                chooseButton.style.display =
                    "none";

            }



            // =================================================
            // PREVIEW FILE
            // =================================================

            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.className =
                "preview-wrapper";


            let media;


            const objectURL =
                URL.createObjectURL(
                    file
                );



            if (
                file.type.startsWith(
                    "image/"
                )
            ) {

                media =
                    document.createElement(
                        "img"
                    );


                media.src =
                    objectURL;


                media.alt =
                    "Preview file yang dipilih";

            }

            else {

                media =
                    document.createElement(
                        "video"
                    );


                media.src =
                    objectURL;


                media.controls =
                    true;

            }



            media.className =
                "preview-media";


            wrapper.appendChild(
                media
            );



            // =================================================
            // TOMBOL HAPUS
            // =================================================

            const removeButton =
                document.createElement(
                    "button"
                );


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

                    fileInput.value =
                        "";


                    if (preview) {

                        preview.innerHTML =
                            "";

                    }


                    if (fileName) {

                        fileName.textContent =
                            "";

                    }


                    if (icon) {

                        icon.style.display =
                            "flex";

                    }


                    if (chooseButton) {

                        chooseButton.style.display =
                            "block";

                    }



                    // Hapus data

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


                    if (checkButton) {

                        checkButton.disabled =
                            true;

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

        }
    );

}



// =====================================================
// BUTTON CEK SEKARANG
// =====================================================

function goAnalysis() {

    const input =
        document.getElementById(
            "fileInput"
        );


    const checkButton =
        document.getElementById(
            "checkButton"
        );


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



    if (checkButton) {

        checkButton.disabled =
            true;


        checkButton.textContent =
            "Memproses...";

    }



    window.location.href =
        "analysis.html";

}



const checkButton =
    document.getElementById(
        "checkButton"
    );


if (
    checkButton &&
    !checkButton.hasAttribute(
        "onclick"
    )
) {

    checkButton.addEventListener(
        "click",
        goAnalysis
    );

}



// =====================================================
// SIMULASI SKOR DETEKSI AI
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

    if (
        !element ||
        !savedFile
    ) {

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



if (
    progress &&
    percent
) {

    let value = 0;


    const timer =
        setInterval(
            function () {

                value++;



                // Progress

                progress.style.width =
                    value + "%";


                percent.textContent =
                    value + "%";



                // Lingkaran

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



                // =================================================
                // TEXT LOADING
                // =================================================

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



                // =================================================
                // SELESAI
                // =================================================

                if (
                    value >= 100
                ) {

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
        Number.isNaN(
            aiScore
        )
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



    // =================================================
    // ANGKA UTAMA
    // =================================================

    score.textContent =
        aiScore + "%";



    // =================================================
    // PROGRESS
    // =================================================

    if (resultProgress) {

        requestAnimationFrame(
            function () {

                resultProgress.style.width =
                    aiScore + "%";

            }
        );

    }



    // =================================================
    // ANGKA BAWAH
    // =================================================

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



    // =================================================
    // BADGE
    // =================================================

    if (resultBadge) {

        if (
            aiScore >= 70
        ) {

            resultBadge.textContent =
                "⚠️ Kemungkinan Tinggi";

        }

        else if (
            aiScore >= 40
        ) {

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



    // =================================================
    // VIDEO
    // =================================================

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



            let brightnessTotal =
                0;


            const brightnessValues =
                [];


            let textureTotal =
                0;


            let previousBrightness =
                null;



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


            let variance =
                0;


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



    // =================================================
    // PENCAHAYAAN
    // =================================================

    if (
        brightness > 190
    ) {

        title1.textContent =
            "☀️ Pencahayaan Sangat Terang";


        text1.textContent =
            "Gambar memiliki tingkat pencahayaan yang cukup tinggi pada sebagian besar area.";

    }

    else if (
        brightness < 70
    ) {

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



    // =================================================
    // KONTRAS
    // =================================================

    if (
        contrast > 70
    ) {

        title2.textContent =
            "◐ Kontras Visual Tinggi";


        text2.textContent =
            "Perbedaan antara area terang dan gelap terlihat cukup kuat pada gambar.";

    }

    else if (
        contrast < 35
    ) {

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



    // =================================================
    // TEKSTUR
    // =================================================

    if (
        texture > 45
    ) {

        title3.textContent =
            "🔍 Detail dan Tekstur Kompleks";


        text3.textContent =
            "Terdapat banyak perubahan detail dan tekstur pada area gambar.";

    }

    else if (
        texture < 18
    ) {

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



// =====================================================
// JALANKAN ANALISIS DI RESULT PAGE
// =====================================================

if (
    document.getElementById(
        "factorTitle1"
    )
) {

    analyzeUploadedImage();

}



// =====================================================
// SCROLL REVEAL - FACTOR CARD
// =====================================================

const factorCards =
    document.querySelectorAll(
        ".factor-section .factor-card"
    );


if (
    factorCards.length > 0
) {

    let nextCard =
        0;


    let previousScrollY =
        window.scrollY;


    let accumulatedScroll =
        0;


    const scrollDistance =
        120;



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



        if (
            delta <= 0
        ) {

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


            accumulatedScroll =
                0;

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



// =====================================================
// SCROLL ANIMATION - TIGA LANGKAH
// =====================================================

const stepCards =
    document.querySelectorAll(
        ".step-card"
    );


if (
    stepCards.length > 0 &&
    "IntersectionObserver" in window
) {

    const stepObserver =
        new IntersectionObserver(
            function (
                entries,
                observer
            ) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.2
            }
        );


    stepCards.forEach(
        function (card) {

            stepObserver.observe(
                card
            );

        }
    );

}



// =====================================================
// BANTUAN - INTERAKTIF
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // =================================================
        // SCROLL REVEAL BANTUAN
        // =================================================

        const helpElements =
            document.querySelectorAll(
                ".help-reveal"
            );


        if (
            helpElements.length > 0 &&
            "IntersectionObserver" in window
        ) {

            const revealObserver =
                new IntersectionObserver(
                    function (
                        entries,
                        observer
                    ) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "show"
                                    );


                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.15
                    }
                );


            helpElements.forEach(
                function (element) {

                    revealObserver.observe(
                        element
                    );

                }
            );

        }



        // =================================================
        // FAQ ACCORDION
        // =================================================

        const faqQuestions =
            document.querySelectorAll(
                ".faq-question"
            );


        faqQuestions.forEach(
            function (question) {

                question.addEventListener(
                    "click",
                    function () {

                        const faqItem =
                            question.closest(
                                ".faq-item"
                            );


                        if (!faqItem) {
                            return;
                        }


                        const isOpen =
                            faqItem.classList.contains(
                                "open"
                            );



                        // Tutup FAQ lainnya

                        document
                            .querySelectorAll(
                                ".faq-item.open"
                            )
                            .forEach(
                                function (item) {

                                    if (
                                        item !==
                                        faqItem
                                    ) {

                                        item.classList.remove(
                                            "open"
                                        );


                                        const otherButton =
                                            item.querySelector(
                                                ".faq-question"
                                            );


                                        if (
                                            otherButton
                                        ) {

                                            otherButton.setAttribute(
                                                "aria-expanded",
                                                "false"
                                            );

                                        }

                                    }

                                }
                            );



                        // Buka / tutup FAQ

                        if (isOpen) {

                            faqItem.classList.remove(
                                "open"
                            );


                            question.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                        else {

                            faqItem.classList.add(
                                "open"
                            );


                            question.setAttribute(
                                "aria-expanded",
                                "true"
                            );

                        }

                    }
                );

            }
        );

    }
);



// =====================================================
// HOAX IMAGE CAROUSEL
// =====================================================
//
// Versi ini:
// - Tidak menggunakan tombol kiri / kanan
// - Tidak menggunakan dots
// - Tidak menggunakan drag
// - Tidak menggunakan swipe
// - Gambar berpindah otomatis
// - Perpindahan tetap smooth
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const carousel =
            document.getElementById(
                "hoaxCarousel"
            );


        const track =
            document.getElementById(
                "hoaxTrack"
            );


        const slides =
            document.querySelectorAll(
                ".hoax-slide"
            );


        const prevButton =
            document.getElementById(
                "carouselPrev"
            );


        const nextButton =
            document.getElementById(
                "carouselNext"
            );


        const dots =
            document.querySelectorAll(
                ".carousel-dot"
            );



        // =================================================
        // CEK CAROUSEL
        // =================================================

        if (
            !carousel ||
            !track ||
            slides.length === 0
        ) {

            return;

        }



        // =================================================
        // SEMBUNYIKAN TOMBOL
        // =================================================

        if (prevButton) {

            prevButton.style.display =
                "none";

        }


        if (nextButton) {

            nextButton.style.display =
                "none";

        }



        // =================================================
        // SEMBUNYIKAN DOT
        // =================================================

        dots.forEach(
            function (dot) {

                dot.style.display =
                    "none";

            }
        );



        // =================================================
        // POSISI SLIDE
        // =================================================

        let currentSlide =
            0;



        // =================================================
        // PINDAH SLIDE
        // =================================================

        function goToSlide(index) {

            if (
                index >=
                slides.length
            ) {

                index = 0;

            }


            currentSlide =
                index;


            track.style.transition =
                "transform 0.8s ease";


            track.style.transform =
                `translateX(-${currentSlide * 100}%)`;

        }



        // =================================================
        // NEXT SLIDE
        // =================================================

        function nextSlide() {

            goToSlide(
                currentSlide + 1
            );

        }



        // =================================================
        // AUTO SLIDE
        // =================================================

        setInterval(
            function () {

                nextSlide();

            },
            4000
        );



        // =================================================
        // POSISI AWAL
        // =================================================

        goToSlide(0);

    }
);