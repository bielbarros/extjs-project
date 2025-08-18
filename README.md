# Práticas com ExtJs

Um sistema de prática e aprendizado do ExtJS 3.4.1, desenvolvido para demonstrar diferentes componentes e funcionalidades da biblioteca.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Módulos Disponíveis](#módulos-disponíveis)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar](#como-executar)
- [Funcionalidades](#funcionalidades)
- [Screenshots](#screenshots)
- [Contribuição](#contribuição)

## Visão Geral

Este projeto é uma coleção de exemplos práticos do ExtJS 3.4.1, organizados em módulos independentes que demonstram diferentes aspectos da biblioteca. Cada módulo foi desenvolvido para ser um ambiente de aprendizado e prática, permitindo que desenvolvedores explorem os componentes do ExtJS de forma interativa.

## Estrutura do Projeto

```
extjs-project/
├── formulario-simples/     # Sistema de formulários avançados
├── panel-simples/          # Exemplos de painéis básicos
├── window/                 # Sistema de janelas simples
├── window-navigation/      # Janelas com navegação
├── xtypes/                 # Sistema completo com xtypes
└── README.md
```

## Módulos Disponíveis

### 1. **Formulário** 
Sistema de formulários com validação, grid interativo e diferentes tipos de campos.

**Características:**
- Grid de usuários com CRUD completo
- Formulários com validação avançada
- Sistema de abas organizado
- Componentes interativos (alert, confirm, prompt)
- Progress bar com animação

![Formulário Avançado](formulario/img/form.png)
![Formulário - Grid](formulario/img/form2.png)
![Formulário - Componentes](formulario/img/form3.png)

### 2. **Xtypes** 
Sistema com layout border, navegação lateral e formulários organizados por categorias.

**Características:**
- Layout border com navegação lateral
- 5 abas organizadas por categoria
- Toolbar com ícones
- Campo de pesquisa funcional
- Formulários com validação específica

![XTypes - Visão Geral](xtypes/img/xtype.png)
![XTypes - Dados Pessoais](xtypes/img/xtype2.png)
![XTypes - Contato](xtypes/img/xtype3.png)
![XTypes - Endereço](xtypes/img/xtype4.png)
![XTypes - Profissional](xtypes/img/xtype5.png)

### 3. **Window** 
Sistema simples de janelas com abas, demonstrando conceitos básicos do ExtJS.

**Características:**
- Janela modal com abas
- Botão para abrir/fechar
- Conteúdo HTML simples
- Estrutura básica e limpa

![Janela Simples](window/img/window1.png)

### 4. **Window-Navigation** 
Janelas com layout border e navegação lateral, demonstrando layouts mais complexos.

**Características:**
- Layout border com painel lateral
- Sistema de abas no centro
- Painel de navegação colapsível
- Estrutura organizada

![Janela com Navegação](window-navigation/img/window-navigation.png)

### 5. **Panel-Simples** 
Exemplos básicos de painéis e componentes simples do ExtJS.

**Características:**
- Painéis básicos
- Componentes simples
- Demonstração de layouts
- Código limpo e direto

![Painel Simples](panel-simples/img/panel.png)

## Tecnologias Utilizadas

- **ExtJS 3.4.1** - Framework JavaScript principal
- **HTML5** - Estrutura das páginas
- **JavaScript** - Lógica de programação

## Como Executar

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, mas recomendado)

### Passos para Execução

1. **Clone o repositório:**
   ```bash
   git clone [url-do-repositorio]
   cd extjs-project
   ```

2. **Escolha um módulo:**
   - Navegue até a pasta do módulo desejado
   - Abra o arquivo `index.html` no navegador

3. **Exemplos de execução:**
   ```bash
   # Para o sistema de formulários avançados
   open formulario-avançado/index.html
   
   # Para o sistema xtypes
   open xtypes/index.html
   
   # Para janelas simples
   open window/index.html
   ```

## Funcionalidades

### Componentes Demonstrados

- **GridPanel** - Tabelas interativas com dados
- **FormPanel** - Formulários com validação
- **Window** - Janelas modais e não-modais
- **TabPanel** - Sistema de abas
- **Panel** - Painéis com diferentes layouts
- **Button** - Botões com handlers
- **TextField** - Campos de texto
- **DateField** - Seletores de data
- **NumberField** - Campos numéricos
- **ComboBox** - Caixas de seleção
- **CheckBox** - Caixas de seleção
- **MessageBox** - Diálogos de mensagem
- **ProgressBar** - Barras de progresso

### Validações Implementadas

- **Campos obrigatórios** (`allowBlank: false`)
- **Validação de email** (`vtype: 'email'`)
- **Valores numéricos** (`minValue`, `maxValue`)
- **Máscaras de entrada** (`maskRe`)
- **Formatação de data** (`format: 'd/m/Y'`)

### Layouts Utilizados

- **Border Layout** - Layout com regiões (north, south, east, west, center)
- **Fit Layout** - Layout que se adapta ao container
- **Form Layout** - Layout específico para formulários
- **HBox Layout** - Layout horizontal
- **VBox Layout** - Layout vertical

## Screenshots

### Sistema de Formulários
![Formulário Principal](formulario/img/form.png)

### Sistema XTypes
![XTypes Principal](xtypes/img/xtype.png)

### Janelas Simples
![Janela Básica](window/img/window1.png)

### Janelas com Navegação
![Janela com Navegação](window-navigation/img/window-navigation.png)

### Painéis Simples
![Painel Básico](panel-simples/img/panel.png)


##  Autor

Desenvolvido por **Gabriel Barros** para fins de prática do ExtJS 3.4.1.

---

**⭐ Se este projeto foi útil para você, considere dar uma estrela!**
