//Load Data in Table when documents is ready

$(document).ready(function () {
    loadData();
    $(document).on('click', 'input[type="checkbox"]', '.selectItem', function(id) {
        $('input[type="checkbox"]').not(this).prop('checked', false);

        if ($(this).is(':checked', true))
        {
            getbyID(this.id);
        }
        else ($(this).is(':checked', false))
        {
            Erase();
        }
      
    });

});

var graphicString = "";

//Load Data function
function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td><input class="selectItem" type="checkbox" id="' + item.RoadID +'"  style = "cursor:pointer" name="selectCheck"> ' + '</td> ';
                html += '<td>' + item.Name + '</td>';
                html += '<td><a href="#" onclick="return UpdateID(' + item.RoadID + ')" class="glyphicon glyphicon-pencil" title="Edit"><i class="icon-pencil icon-white"></i></a> | <a href="#" onclick="Delete(' + item.RoadID + ')" class="glyphicon glyphicon-trash" title="Delete"><i class="icon-pencil icon-white"></i></a></td>' 
                html += '<td style="visibility:hidden;">' + item.RoadID + '</td>';
                html += '</tr>';
               
            });
            $('.tbody').html(html);
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Add Data Function
function Add(jsonString) {
    
    var res = validate();
    
    if (res == false) {
        return false;
    }
  
    var Obj = {
        RoadID: $('#RoadID').val(),
        Name: $('#Name').val(),
        Graphic_Route: jsonString
        
    };
    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//Function for getting the Data Based upon Employee ID
function getbyID(id) {
    $('#Name').css('border-color', 'lightgrey');
   
    $.ajax({
        url: "/Home/getbyID/" + id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#RoadID').val(result.RoadID);
            $('#Name').val(result.Name);
            graphicString = result.Graphic_Route;
            var drawG = new drawGraphics();
            drawG.drawGraphic(JSON.parse(graphicString));
           
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
function UpdateID(id) {
    $('#Name').css('border-color', 'lightgrey');

    $.ajax({
        url: "/Home/UpdateID/" + id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#RoadID').val(result.RoadID);
            $('#Name').val(result.Name);
          
            
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
//function for updating road's record
function Update(jsonString) {
    var res = validate();
    if (res == false) {
        return false;
    }
    var Obj = {
        RoadID: $('#RoadID').val(),
        Name: $('#Name').val(),
        Graphic_Route: jsonString
       
    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(Obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            alert("Graphics saved Successfully");
            $('#myModal').modal('hide');
            $('#RoadID').val("");
            $('#Name').val("");
            $('Graphic_Route').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
//function for deleting road's record
function Delete(ID) {
    var ans = confirm("Are you sure you want to delete this Road?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
//Function for clearing the textboxes
function clearTextBox() {
    $('#RoadID').val("");
    $('#Name').val("");
  
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
  
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
   
    return isValid;
}


    