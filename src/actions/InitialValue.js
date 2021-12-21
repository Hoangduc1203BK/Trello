export const initialValue={
    boards:[
        {
            id:'board-1',
            columnOrder:['column-1','column-2','column-3'],
            columns:[
            {
                id:'column-1',
                boardId:'board-1',
                title:'To do',
                cardOrder:['card-1','card-2','card-3'],
                cards:[{
                    id:'card-1',
                    boardId:'board-1',
                    columnId:'column-1',
                    title:'Title of card-1',
                    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgbbFp-taMu0gdvk0p1VgT-gvRv9t4Yd_dGw&usqp=CAU"
                },
                {
                    id:'card-2', boardId:'board-1',columnId:'column-1',title:'Title of card-2',image:null
                },
                 {
                    id:'card-3', boardId:'board-1',columnId:'column-1',title:'Title of card-1',image:null
                },{
                    id:'card-3', boardId:'board-1',columnId:'column-1',title:'Title of card-1',image:null
                },{
                    id:'card-3', boardId:'board-1',columnId:'column-1',title:'Title of card-1',image:null
                },{
                    id:'card-3', boardId:'board-1',columnId:'column-1',title:'Title of card-1',image:null
                },{
                    id:'card-3', boardId:'board-1',columnId:'column-1',title:'Title of card-1',image:null
                },{
                    id:'card-3', boardId:'board-1',columnId:'column-1',title:'Title of card-1',image:null
                }],
            },
            {
                id:'column-2',
                boardId:'board-1',
                title:'Doing',
                cardOrder:['card-4','card-5'],
                cards:[{
                    id:'card-4',
                    boardId:'board-1',
                    columnId:'column-2',
                    title:'Title of card-4',
                    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgbbFp-taMu0gdvk0p1VgT-gvRv9t4Yd_dGw&usqp=CAU"
                },
                {
                    id:'card-5', boardId:'board-1',columnId:'column-2',title:'Title of card-5',image:null
                }]
            },{
                id:'column-3',
                boardId:'board-1',
                title:'Done',
                cardOrder:['card-6','card-7','card-8'],
                cards:[{
                    id:'card-6',
                    boardId:'board-1',
                    columnId:'column-3',
                    title:'Title of card-6',
                    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgbbFp-taMu0gdvk0p1VgT-gvRv9t4Yd_dGw&usqp=CAU"
                },
                {
                    id:'card-7', boardId:'board-1',columnId:'column-3',title:'Title of card-7',image:null
                },
                 {
                    id:'card-8', boardId:'board-1',columnId:'column-8',title:'Title of card-8',image:null
                }]
            }
        ]
        }
    ]
}