$(document).ready(function() {
    console.log('ready gan !')
    const corona = {}

    const fetch_data = ( cb ) => {

        //1. get loader
        $.ajax({
            url: 'https://coronavirus-worlddata.herokuapp.com/all',
            type: 'GET',
            success: function(res) {
                corona.data = res;
                corona.indonesia = res['indonesia'];

                cb(corona)
            },
            error: function(err) {
                console.log(err)
            }
        })
    }

    const renderData = (res, DATA) => {
        //1. finish loader


        let html = '', replaceCured, replaceDeaths
        if(DATA.length > 0){
            DATA.forEach(item => {
                item.case.cured ? replaceCured = item.case.cured : replaceCured = '-'
                item.case.deaths ? replaceDeaths = item.case.deaths : replaceDeaths = '-'


                html += `
                    <div class="story">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="story__country">${item.name}</div>
                                </div>
                                <div class="col-md-8">
                                    <ul class="story__list">
                                        <li class="story__item">Active : ${item.case.active}</li>
                                        <li class="story__item">Cured : ${replaceCured}</li>
                                        <li class="story__item">Deaths : ${replaceDeaths}</li>
                                        <li class="story__item">Total : ${item.case.total}</li>
                                    </ul>
                                </div>
                            </div>
                    </div>
                `;
            })
        }

        $('.collection-country').html(html);
        $('.total_results').html(`${DATA.length} country`);

        $('.d_active').text(`Active : ${res.indonesia.active}`)
        $('.d_cured').text(`Cured : ${res.indonesia.cured}`)
        $('.d_deaths').text(`Deaths : ${res.indonesia.deaths}`)
        $('.d_total').text(`Total : ${res.indonesia.total}`)

    }

    const onSearch = () => {
        let input , filter , containerWrapper, parentData, childData, i, textValue;

        input = document.querySelector('#name');
        filter = input.value.toUpperCase();

        containerWrapper = document.querySelector('.collection-country');
        parentData       = document.getElementsByClassName('story');

        for(i = 0; i<parentData.length; i++){
            childData = parentData[i].getElementsByClassName('story__country')[0]

            if(childData) {
                textValue = childData.textContent || childData.innerText;
                if(textValue.toUpperCase().indexOf(filter) > -1){
                    parentData[i].style.display = 'block';
                }else{
                    parentData[i].style.display = 'none'
                }
            }
        }

    }


    fetch_data( res => {
       let keys, DATA = []

       keys = Object.keys(res.data);
       

       keys.forEach( item => {

           DATA.push( {
               name: item,
               case:  corona.data[item]
           });

       });

       renderData(res, DATA);
       
    })

    $(document).on('keyup', '#name', function() {
        onSearch();
    });

    




})