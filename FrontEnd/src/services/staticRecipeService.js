// Dados estáticos de receitas completas (R5 Mock Data)
const staticRecipesData = {
    "pizza-pepperoni": {
        title: "Pizza de Pepperoni Caseira",
        time: "40 min",
        image_url: "/imagens/receitas/PizzaPepperoni.jpg",
        ingredients: [
            "1 massa de pizza pré-pronta ou caseira",
            "1 xícara de molho de tomate",
            "200g de queijo mussarela ralado",
            "150g de pepperoni fatiado",
            "Orégano a gosto",
        ],
        steps: [
            "Pré-aqueça o forno a 220°C.",
            "Espalhe o molho de tomate uniformemente sobre a massa.",
            "Distribua o queijo mussarela e, por cima, arranje as fatias de pepperoni.",
            "Polvilhe orégano.",
            "Asse por 15 a 20 minutos, ou até que o queijo esteja dourado e borbulhante.",
            "Retire do forno, corte e sirva imediatamente."
        ]
    },
    "bolo-cenoura": {
        title: "Bolo de Cenoura Clássico",
        time: "50 min",
        image_url: "/imagens/receitas/boloDeCenouras.avif",
        ingredients: [
            "3 cenouras médias picadas",
            "4 ovos",
            "½ xícara de óleo vegetal",
            "2 xícaras de farinha de trigo",
            "2 xícaras de açúcar",
            "1 colher de sopa de fermento em pó"
        ],
        steps: [
            "Bata no liquidificador a cenoura, os ovos e o óleo até obter um creme homogêneo.",
            "Em uma tigela separada, misture a farinha, o açúcar e o fermento.",
            "Adicione a mistura do liquidificador aos ingredientes secos e mexa até incorporar.",
            "Despeje a massa em uma forma untada e enfarinhada.",
            "Asse em forno pré-aquecido a 180°C por cerca de 40 minutos.",
            "Retire do forno, deixe esfriar e cubra com a sua calda preferida."
        ]
    },
    // Adicione as outras receitas estáticas aqui (Costela e Lasanha)
    "costela-assada": {
        title: "Costela Assada no Forno com Batatas",
        time: "3 horas",
        image_url: "/imagens/receitas/costela.jpeg",
        ingredients: [
            "1 kg de costela bovina em tiras",
            "Sal grosso a gosto",
            "Pimenta do reino a gosto",
            "1 cabeça de alho esmagada",
            "5 batatas grandes cortadas em pedaços"
        ],
        steps: [
            "Tempere a costela com o alho e pimenta do reino. Enrole-a firmemente em papel alumínio.",
            "Coloque a costela em uma assadeira e asse em forno baixo (150°C) por 2,5 horas.",
            "Após esse tempo, adicione as batatas à assadeira, temperadas com sal grosso.",
            "Feche o papel alumínio novamente e asse por mais 30 minutos.",
            "Retire o papel alumínio e deixe dourar por mais 15 minutos antes de servir."
        ]
    },
    "lasanha": {
        title: "Lasanha Clássica à Bolonhesa",
        time: "1h 15 min",
        image_url: "/imagens/receitas/lasanha.jpeg",
        ingredients: [
            "500g de massa para lasanha",
            "500g de carne moída",
            "1 sachê de molho de tomate",
            "300g de presunto fatiado",
            "300g de mussarela fatiada",
            "Molho branco (bechamel) ou requeijão para camadas"
        ],
        steps: [
            "Prepare o molho à bolonhesa refogando a carne moída e adicionando o molho de tomate.",
            "Em uma forma, intercale camadas de molho, massa, presunto e mussarela.",
            "Se for usar molho branco, adicione-o por cima das camadas de molho vermelho.",
            "Finalize com uma camada generosa de mussarela ralada e queijo parmesão.",
            "Leve ao forno pré-aquecido a 200°C por 30 minutos, ou até gratinar.",
            "Deixe descansar por 10 minutos antes de cortar para evitar que desmorone."
        ]
    },
};

/**
 * Função que busca a receita estática completa pelo SLUG (ID)
 * @param {string} slug - O identificador (ex: 'pizza-pepperoni')
 * @returns {object|null} A receita completa ou null.
 */
export function getStaticRecipeBySlug(slug) {
    return staticRecipesData[slug] || null;
}