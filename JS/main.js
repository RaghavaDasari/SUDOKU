var sudoku,inputs;
$(document).ready(function(){
  inputs = $("input[type=text]");
  sudoku = [];
  //to clear all the input boxes in the document...
  $("#reset").click(function(){
    inputs.val("");
    for(var i=0;i<9;i++){
      for(var j=0;j<9;j++){
        sudoku[i][j] = 0;
        }
    }
  });


  $('#submit').click(function(){
    var i=0,j=0,z;
    var temp = []
    inputs.each(function(){
      z = $(this).val();
      if(z == ''){
        temp.push(0);
      }
      else{
        temp.push(parseInt(z));
      }
      j+=1;
      if(j==9){
        sudoku.push(temp);
        temp = [];
        i+=1;
        j=0;
      }
    });
    solveSudoku(0,0);
  });

});

function solveSudoku(row,col){
  if(row>8){
    display();
  }
  if(sudoku[row][col]!=0){
    navigate(row,col);
  }
  else{
    for(var i=1;i<=9;i++){
      if(CRow(row,i)==true && CCol(col,i)==true && CBox(row,col,i)==true){
        sudoku[row][col] = i;
        navigate(row,col);
      }
    }
    sudoku[row][col] = 0;
  }
}

function CRow(row,val){
  for(var j=0;j<9;j++){
    if(sudoku[row][j] == val){
      return false;
    }
  }
  return true;
}

function CCol(col,val){
  for(var j=0;j<9;j++){
    if(sudoku[j][col] == val){
      return false;
    }
  }
  return true;
}

function CBox(row,col,val){
  row=((row/3)|0)*3;
	col=((col/3)|0)*3;
  for(var i=0;i<3;i++){
    for(var j=0;j<3;j++){
      if(sudoku[row+i][col+j] == val){
        return false;
      }
    }
  }
  return true;
}

function navigate(row,col){
  if(col<8){
    solveSudoku(row,col+1);
  }
  else{
    solveSudoku(row+1,0);
  }
}

function display(){
  var i=0,j=0;
  inputs.each(function(){
    $(this).val(sudoku[i][j].toString());
    j += 1;
    if(j == 9){
      i += 1;
      j = 0;
    }
  });
  // for(i=0;i<9;i++){
  //   for(j=0;j<9;j++){
  //     document.write(sudoku[i][j]+"&nbsp;");
  //   }
  //   document.write("<br>");
  // }
}
