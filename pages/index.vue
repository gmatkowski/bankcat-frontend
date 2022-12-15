<template>
  <div class="bg1-color">
  <v-container>
    
  <table class="unstyledTable">
    <tbody>
      <tr>
        <td><img src="../src/assets/piggy-bank-blank.png" width="70%"></td>
        <td><font size="200px">TEXT</font></td>
      </tr>
      <tr>
        <td><font size="200px">TEXT</font></td>
        <td> <img src="../src/assets/save-money6.png" width="70%"></td>
      </tr>
      <tr>
        <td><img src="../src/assets/save-money.png" width="70%"></td>
        <td><font size="200px">TEXT</font></td>
      </tr>
    </tbody>
  </table>
</v-container>
  </div>
</template>

<script>


export default {
  name: 'index'
}

</script>

<style>
  .bg1-color{
    margin-top: 0px;
    /*background-image: radial-gradient(circle at 50% 50%, #ffffaf 0, #ffffa6 25%, #f2f29d 50%, #d7dd94 75%, #bfca8b 100%);*/
    /*background-color: #4040ff ;*/
    background-image: linear-gradient(#C1C8E4, #5AB9EA);
  }
  table.unstyledTable {
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    width: 80%;
    text-align: center;
    font-size:1vmax;
    color:white;
  }
  table.unstyledTable td, table.unstyledTable th {
    padding: 15px 15px;
  }
  table.mt{
    margin-top: 150px;
    text-align: center;
    justify-content: center;
    margin-inline: auto;
    font-size:3vmax;
    font-style:oblique;
    padding: 15px 15px;
    color:white;
  }
</style>