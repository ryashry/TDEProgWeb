document.addEventListener("DOMContentLoaded", () => {
    const clickSound = new Audio("sounds/click.mp3");

    const loadSettings = () => {
        if (localStorage.getItem("daltonismo") === "true") document.body.classList.add("daltonismo");
        if (localStorage.getItem("darkMode") === "true") document.body.classList.add("dark-mode");
        if (localStorage.getItem("highContrast") === "true") document.body.classList.add("high-contrast");
        if (localStorage.getItem("spacing") === "true") document.body.classList.add("spacing");
        if (localStorage.getItem("fontSize")) document.body.style.fontSize = `${localStorage.getItem("fontSize")}px`;

        if (localStorage.getItem("feedback") === "true") {
            document.querySelectorAll("button, input, select").forEach(el => {
                el.addEventListener("click", () => clickSound.play());
            });
        }

        if (localStorage.getItem("tts") === "true") {
            document.body.addEventListener("mouseover", (e) => {
                if (e.target.innerText) {
                    const utterance = new SpeechSynthesisUtterance(e.target.innerText);
                    speechSynthesis.speak(utterance);
                }
            });
        }
    };

    const saveSettings = () => {
        const daltonismoMode = document.getElementById("daltonismoMode")?.checked || false;
        const darkMode = document.getElementById("darkMode")?.checked || false;
        const highContrast = document.getElementById("highContrast")?.checked || false;
        const spacing = document.getElementById("spacing")?.checked || false;
        const feedback = document.getElementById("feedback")?.checked || false;
        const fontSize = document.getElementById("fontSize")?.value || "16";
        const tts = document.getElementById("tts")?.checked || false;

        document.body.classList.toggle("daltonismo", daltonismoMode);
        document.body.classList.toggle("dark-mode", darkMode);
        document.body.classList.toggle("high-contrast", highContrast);
        document.body.classList.toggle("spacing", spacing);
        document.body.style.fontSize = `${fontSize}px`;

        localStorage.setItem("daltonismo", daltonismoMode);
        localStorage.setItem("darkMode", darkMode);
        localStorage.setItem("highContrast", highContrast);
        localStorage.setItem("spacing", spacing);
        localStorage.setItem("feedback", feedback);
        localStorage.setItem("fontSize", fontSize);
        localStorage.setItem("tts", tts);
    };

    const applySettingsButton = document.getElementById("applySettings");
    if (applySettingsButton) {
        applySettingsButton.addEventListener("click", saveSettings);
    }

    loadSettings();

        // --- Barra de Pesquisa ---
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const searchResultsSection = document.getElementById("searchResults");

    const content = [
        {
            type: "article",
            title: "Benefícios de um site acessível",
            description: "Entenda por que criar sites acessíveis é crucial para inclusão social.",
            link: "artigos.html"
        },
        {
            type: "article",
            title: "Como criar um site acessível",
            description: "Diretrizes práticas para desenvolver sites inclusivos.",
            link: "artigos.html"
        },
        {
            type: "video",
            title: "Acessibilidade em páginas web",
            description: "Um vídeo explicando como a tecnologia pode ajudar na acessibilidade.",
            link: "videos/Acessibilidade_em_paginas_web.mp4"
        },
        {
            type: "podcast",
            title: "Como usar acessibilidade web no seu projeto front end na prática!",
            description: "Discussão sobre a importância da acessibilidade digital.",
            link: "podcasts/Como_usar_acessibilidade.mp3"
        },
    ];

    function displaySearchResults(query) {
        const results = content.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );

        searchResultsSection.innerHTML = ""; // Limpa os resultados anteriores

        if (results.length === 0) {
            searchResultsSection.innerHTML = `<p>Nenhum resultado encontrado para "${query}".</p>`;
            searchResultsSection.style.display = "block";
            return;
        }

        results.forEach(item => {
            const resultItem = document.createElement("div");
            resultItem.className = "result-item";
            resultItem.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="${item.link}" target="_blank">Ver Mais</a>
            `;
            searchResultsSection.appendChild(resultItem);
        });

        searchResultsSection.style.display = "block";
    }

    if (searchButton) {
        searchButton.addEventListener("click", () => {
            const query = searchInput.value.trim();
            if (query) {
                displaySearchResults(query);
                searchResultsSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }


    const chartsList = document.getElementById("chartsList");

    if (chartsList) {
        const charts = [
            {
                filename: "Tabela 1.1 (Pessoas_Geo)_grafico.png",
                title: "Distribuição de Pessoas por Região Geográfica",
                description: "Este gráfico apresenta a distribuição populacional por regiões geográficas do Brasil."
            },
            {
                filename: "Tabela 1.2 (Pessoas_pct_Geo)_grafico.png",
                title: "Percentual de Pessoas por Região Geográfica",
                description: "Percentual relativo de pessoas em cada região geográfica, destacando proporções populacionais."
            },
            {
                filename: "Tabela 1.3 (Instruc_Geo)_grafico.png",
                title: "Níveis de Instrução por Região",
                description: "Dados de níveis de instrução distribuídos por regiões do Brasil."
            },
            {
                filename: "Tabela 1.4 (Instruc_pct_Geo)_grafico.png",
                title: "Percentual de Níveis de Instrução por Região",
                description: "Percentuais de pessoas em diferentes níveis de instrução por região geográfica."
            },
            {
                filename: "Tabela 1.5 (dificult_BR)_grafico.png",
                title: "Dificuldades de Acessibilidade no Brasil",
                description: "Estatísticas de dificuldades de acessibilidade enfrentadas por pessoas no Brasil."
            },
            {
                filename: "Tabela 1.7 (DomDefic_BR)_grafico.png",
                title: "Distribuição de Deficiências por Domicílios",
                description: "Gráfico mostrando dados de deficiências em domicílios brasileiros."
            },
            {
                filename: "Tabela 1.10 (PaiFilho_Geo)_grafico.png",
                title: "Distribuição de Pais e Filhos por Região",
                description: "Dados sobre famílias distribuídas por regiões geográficas."
            },
            {
                filename: "Tabela 1.11 (Nupc_BR)_grafico.png",
                title: "Dados de Núpcias no Brasil",
                description: "Estatísticas relacionadas a núpcias no Brasil."
            },
            {
                filename: "Tabela 1.12 (Nupc_pct_BR)_grafico.png",
                title: "Percentual de Núpcias no Brasil",
                description: "Percentuais de núpcias no Brasil, divididos por diferentes categorias."
            },
        ];

        charts.forEach(chart => {
            const chartItem = document.createElement("div");
            chartItem.className = "chart-item";

            const img = document.createElement("img");
            img.src = `tabelas/${chart.filename}`;
            img.alt = `Gráfico: ${chart.title}`;
            img.addEventListener("click", () => openPopup(img.src, img.alt));

            const details = document.createElement("div");
            details.className = "chart-details";
            details.innerHTML = `
                <h2>${chart.title}</h2>
                <p>${chart.description}</p>
            `;

            chartItem.appendChild(img);
            chartItem.appendChild(details);
            chartsList.appendChild(chartItem);
        });
    }

    const imagePopup = document.getElementById("imagePopup");
    const popupImage = document.getElementById("popupImage");
    const closePopup = document.getElementById("closePopup");

    const openPopup = (src, alt) => {
        if (imagePopup) {
            popupImage.src = src;
            popupImage.alt = alt;
            imagePopup.style.display = "flex";
        }
    };

    if (imagePopup) {
        closePopup.addEventListener("click", () => (imagePopup.style.display = "none"));
        imagePopup.addEventListener("click", (e) => {
            if (e.target === imagePopup) imagePopup.style.display = "none";
        });
    }

    const formTipo = document.getElementById("formTipo");
    const formExtra = document.getElementById("formExtra");

    if (formTipo) {
        formTipo.addEventListener("change", () => {
            const selected = formTipo.value;
            formExtra.innerHTML = "";

            if (selected === "duvida") {
                formExtra.innerHTML = `
                    <div class="form-group">
                        <label for="duvida">Como usar o site?</label>
                        <textarea id="duvida" name="duvida" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="submit-button">Enviar</button>
                `;
            } else if (selected === "avaliacao") {
                formExtra.innerHTML = `
                    <div class="form-group">
                        <label for="avaliacao">Qual a sua avaliação do site?</label>
                        <textarea id="avaliacao" name="avaliacao" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Classificação:</label>
                        <div class="stars">
                            <input type="radio" id="star5" name="estrelas" value="5" required>
                            <label for="star5">5 estrelas</label>
                            <input type="radio" id="star4" name="estrelas" value="4">
                            <label for="star4">4 estrelas</label>
                            <input type="radio" id="star3" name="estrelas" value="3">
                            <label for="star3">3 estrelas</label>
                            <input type="radio" id="star2" name="estrelas" value="2">
                            <label for="star2">2 estrelas</label>
                            <input type="radio" id="star1" name="estrelas" value="1">
                            <label for="star1">1 estrela</label>
                        </div>
                    </div>
                    <button type="submit" class="submit-button">Enviar</button>
                `;
            } else if (selected === "sugestao") {
                formExtra.innerHTML = `
                    <div class="form-group">
                        <label for="sugestao">Sugestão para o site:</label>
                        <textarea id="sugestao" name="sugestao" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="submit-button">Enviar</button>
                `;
            } else if (selected === "questionario") {
                formExtra.innerHTML = `
                    <div class="form-group">
                        <label for="pergunta1">Por que a acessibilidade em sites é importante?</label>
                        <textarea id="pergunta1" name="pergunta1" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="pergunta2">Qual benefício mais chamou sua atenção nos gráficos?</label>
                        <textarea id="pergunta2" name="pergunta2" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="submit-button">Enviar</button>
                `;
            }
        });
    }


    const contentList = document.getElementById("contentList");
    const filterVideosButton = document.getElementById("filterVideos");
    const filterPodcastsButton = document.getElementById("filterPodcasts");
    const filterAllButton = document.getElementById("filterAll");

    if (contentList) {
        const content = [
            {
                type: "video",
                title: "Acessibilidade em páginas web",
                description: "Um vídeo explicando como a tecnologia pode ajudar na acessibilidade.",
                thumbnail: "videos/Acessibilidade em páginas web.png",
                link: "videos/Acessibilidade em páginas web.mp4",
            },
            {
                type: "podcast",
                title: "Como usar acessibilidade web no seu projeto front end na prática!",
                description: "Discussão sobre a importância da acessibilidade digital.",
                audio: "podcasts/Como usar acessibilidade web no seu projeto front end na prática.mp3",
            },
            {
                type: "video",
                title: "Acessibilidade Web_ Como Construir um Site Acessível",
                description: "Saiba mais sobre como criar sites acessíveis.",
                thumbnail: "videos/Acessibilidade Web_ Como Construir um Site Acessível (2024) - Hostinger Brasil.png",
                link: "videos/Acessibilidade Web_ Como Construir um Site Acessível (2024) - Hostinger Brasil.mp4",
            },
            {
                type: "podcast",
                title: "WCAG_ Guia de acessibilidade Web _ Mergo Descomplica",
                description: "WCAG_ Guia de acessibilidade Web _ Mergo Descomplica.",
                audio: "podcasts/WCAG_ Guia de acessibilidade Web _ Mergo Descomplica.mp3",
            },
        ];

        function displayContent(filterType) {
            const noContentMessage = document.querySelector(".no-content-message");
            if (noContentMessage) noContentMessage.remove();

            contentList.innerHTML = "";
            const filteredContent = filterType === "all"
                ? content
                : content.filter(item => item.type === filterType);

            if (filteredContent.length === 0) {
                contentList.innerHTML = `<p class="no-content-message">Nenhum conteúdo disponível para o filtro selecionado.</p>`;
                return;
            }

            filteredContent.forEach(item => {
                const contentItem = document.createElement("div");
                contentItem.className = "content-item";

                if (item.type === "video") {
                    contentItem.innerHTML = `
                        <img src="${item.thumbnail}" alt="Miniatura do vídeo: ${item.title}">
                        <h2>${item.title}</h2>
                        <p>${item.description}</p>
                        <a href="${item.link}" target="_blank">Assistir</a>
                    `;
                } else if (item.type === "podcast") {
                    contentItem.innerHTML = `
                        <h2>${item.title}</h2>
                        <p>${item.description}</p>
                        <audio class="audio-player" controls>
                            <source src="${item.audio}" type="audio/mpeg">
                            Seu navegador não suporta o elemento de áudio.
                        </audio>
                    `;
                }

                contentList.appendChild(contentItem);
            });
        }

        if (filterVideosButton) {
            filterVideosButton.addEventListener("click", () => displayContent("video"));
        }
        if (filterPodcastsButton) {
            filterPodcastsButton.addEventListener("click", () => displayContent("podcast"));
        }
        if (filterAllButton) {
            filterAllButton.addEventListener("click", () => displayContent("all"));
        }

        displayContent("all");
    }
});
