export const products = [
    {
        id: 1,
        image: './assets/images/checklist.jpg',
        title: 'Чек-лист по подготовке заявки',
        shortText: 'Пошаговый список действий для аккуратной подачи документов на участие в закупке.',
        price: 'Бесплатно',
        category: 'Документы',
        badge: 'Хит',
        audience: 'Для начинающих',
        description: 'Готовый продукт для тех, кто хочет быстро проверить, все ли документы собраны перед подачей заявки. На странице товара есть расширенное описание, преимущества и этапы использования.',
        features: [
            'Проверка обязательных документов',
            'Подсказки по срокам подачи',
            'Быстрый старт без лишних действий'
        ],
        serviceOfferNumbers: [1, 6, 5, 2, 7, 5, 1, 4, 3, 9, 8, 11, 10, 18],
        targetOfferSum: 5,
        servicePhrase: 'тендер документы сервис',
        serviceValueArray: [2, 3, 4],
        serviceTagCount: 3,
        serviceTagValue: 'документ',
        modelPath: './models/folder.glb'
    },
    {
        id: 2,
        image: './assets/images/instruction.jpg',
        title: 'Инструкция по участию в тендерах',
        shortText: 'Базовый гид по первым шагам: от поиска закупки до отправки заявки.',
        price: '990 ₽',
        category: 'Обучение',
        badge: 'New',
        audience: 'Студентам',
        description: 'Подробная инструкция в удобном формате. Помогает понять структуру участия в закупках и не запутаться в базовых терминах и этапах.',
        features: [
            'Объяснение простыми словами',
            'Разбор основных этапов',
            'Удобный формат для самостоятельного изучения'
        ],
        serviceOfferNumbers: [2, 3, 8, 1, 4, 6, 7, 10, 11, 5],
        targetOfferSum: 9,
        servicePhrase: 'обучение заявка закупка',
        serviceValueArray: [1, 5, 2],
        serviceTagCount: 4,
        serviceTagValue: 'урок',
        modelPath: './models/folder.glb'
    },
    {
        id: 3,
        image: './assets/images/documents.jpg',
        title: 'Проверка комплекта документации',
        shortText: 'Инструмент для самоконтроля перед загрузкой файлов на площадку.',
        price: '1490 ₽',
        category: 'Сервисы',
        badge: 'Top',
        audience: 'Малому бизнесу',
        description: 'Решение для тех, кто хочет снизить риск ошибок при отправке пакета документов. Подходит как учебный пример карточки товара и детальной страницы.',
        features: [
            'Контроль полноты комплекта',
            'Удобная структура проверки',
            'Снижение риска пропуска важных файлов'
        ],
        serviceOfferNumbers: [4, 1, 2, 5, 6, 3, 7, 9, 12, 8],
        targetOfferSum: 10,
        servicePhrase: 'сервис документы проверка',
        serviceValueArray: [3, 2, 6],
        serviceTagCount: 5,
        serviceTagValue: 'сервис',
        modelPath: './models/folder.glb'
    }
];
