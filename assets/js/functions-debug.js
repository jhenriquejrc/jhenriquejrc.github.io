$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $("#btnAjuda").on("click", function () {
        ajuda();
    })

    $("#link-ajuda").on("click", function () {
        ajuda();
    })

    $("#btnSidebarAjuda").on("click", function () {
        ajudaSidebar();
    })

    $("#sidebar").addClass("d-none");



    function ajuda() {
        // Instance the tour
        var tour = new Tour({
            steps: [
                {
                    element: "#autor",
                    title: "Autor",
                    content: "Preencha o nome do autor. Para vários autores use ; (ponto e vírgula) para separar. Exemplo: Paulo Coelho; Ariano Suassuna",
                    placement: "top"
                },
                {
                    element: "#assunto",
                    title: "Assunto",
                    content: "Preencha o assunto ou título do livro.",
                    placement: "bottom"
                },
                {
                    element: "#isbn",
                    title: "ISBN",
                    content: "Preencha o código ISBN do livro. Exemplo: 999-99-999-9999-9 ou 99-99-99999-9.",
                    placement: "top"
                },
                {
                    element: "#btnPesquisar",
                    title: "Pesquisar",
                    content: "Após preenchido as informações clique no botão Pesquisar para iniciar a busca.",
                    placement: "left"
                },
                {
                    element: "#btnLimpar",
                    title: "Limpar",
                    content: "Caso queira limpar todos os campos para iniciar uma nova busca clique no botão Limpar.",
                    placement: "left"
                }
            ],
            smartPlacement: true,
            storage: false,
            backdrop: true,
            backdropPadding: 10
        });

        $("#collapseBuscaAvancMain").collapse("show");
        // Initialize the tour
        tour.init();

        // Start the tour
        tour.start();
    }

    function ajudaSidebar() {
        // Instance the tour
        var tour = new Tour({
            steps: [
                {
                    element: "#formInputAutor",
                    title: "Autor",
                    content: "Preencha o nome do autor. Para vários autores use ; (ponto e vírgula) para separar. Exemplo: Paulo Coelho; Ariano Suassuna",
                    placement: "right"
                },
                {
                    element: "#formInputAssunto",
                    title: "Assunto",
                    content: "Preencha o assunto ou título do livro.",
                    placement: "right"
                },
                {
                    element: "#formInputISBN",
                    title: "ISBN",
                    content: "Preencha o código ISBN do livro. Exemplo: 999-99-999-9999-9 ou 99-99-99999-9.",
                    placement: "right"
                },
                {
                    element: "#btnSidebarPesquisar",
                    title: "Pesquisar",
                    content: "Após preenchido as informações clique no botão Pesquisar para iniciar a busca.",
                    placement: "right"
                },
                {
                    element: "#btnSidebarLimpar",
                    title: "Limpar",
                    content: "Caso queira limpar todos os campos para iniciar uma nova busca clique no botão Limpar.",
                    placement: "right"
                }
            ],
            smartPlacement: true,
            storage: false,
            backdrop: true,
            backdropPadding: 10
        });

        $("#collapseBuscaAvanc").collapse("show");
        // Initialize the tour
        tour.init();

        // Start the tour
        tour.start();
    }

    //validacoes

    function checkISBN(query) {
        var rgx_10 = /^(?:ISBN(?:-10)?:?\ )?(?=[0-9X]{10}$|(?=(?:[0-9]+[-\ ]){3})[-\ 0-9X]{13}$)[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9X]$/
        var rgx_13 = /^(?:ISBN(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$/
        return rgx_10.test(query) || rgx_13.test(query);
    }

    $("#formSidebar").on("submit", function () {

        $("#msgErrorSidebar").addClass("d-none");

        var autor = $("#formInputAutor").val();
        var assunto = $("#formInputAssunto").val();
        var isbn = $("#formInputISBN").val();
        console.log(autor)
        console.log(assunto)
        console.log(autor == "" && assunto == "" && isbn == "")

        if (isbn != "" && checkISBN(isbn)) {
            $("#msgErrorSidebar").removeClass("d-none");
            $("#msgErrorSidebar").html("ISBN Invalido! :(")
            return
        }

        if (autor == "" && assunto == "" && isbn == "") {
            $("#msgErrorSidebar").removeClass("d-none");
            $("#msgErrorSidebar").html("<strong>Preencha pelo menos um campo para pesquisar! :(</strong>")
            return;
        }

    });

    $("#form_search").on("submit", function () {

        $("#mgsError").addClass("d-none");

        var autor = $("#autor").val();
        var assunto = $("#assunto").val();
        var isbn = $("#isbn").val();
        console.log(autor)
        console.log(assunto)
        console.log(autor == "" && assunto == "" && isbn == "")

        console.log(isbn)
        console.log(isbn != "" && checkISBN(isbn))
        if (isbn != "" && checkISBN(isbn)) {
            $("#mgsError").removeClass("d-none");
            $("#mgsError").html("ISBN Invalido! :(")
            return
        }

        if (autor == "" && assunto == "" && isbn == "") {
            $("#mgsError").removeClass("d-none");
            $("#mgsError").html("<strong>Preencha pelo menos um campo para pesquisar! :(</strong>")
            return;
        }

        $("#sidebar").removeClass("d-none");
        //$('#sidebar').toggleClass('active');
        $("#form_search").addClass("d-none");
        $("#loader").removeClass("d-none");
        show_result();

    });


    function show_result() {
        setTimeout(showPage, 3000);
    }

    function showPage() {
        $("#loader").addClass("d-none");
        $("#result").addClass("d-block");
    }


});

