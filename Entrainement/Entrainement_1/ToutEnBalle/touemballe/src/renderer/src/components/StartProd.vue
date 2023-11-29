<template>
  <div id="here">
    <p>{{ prodName }}</p>
    <div class="button">
      <button @click="startProd" :disabled="isStartButtonDisabled">{{ buttonStartText }}</button>
      <button @click="breakProd" :disabled="isbreakButtonDisabled">Pause</button>
      <button @click="stopProd" :disabled="isStopButtonDisabled">Arrêter</button>
    </div>
    <p>{{ boxProd }}</p>
    <table class="info">
      <thead>
        <tr>
          <th>Caisse Produite</th>
          <th>Taux de rebuts</th>
          <th>Taux de rebus par heure</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ prodCount }}</td>
          <td>{{ errorProdCount }} %</td>
          <td>{{ errorProdCountHours }} %</td>
        </tr>
      </tbody>
    </table>
    <div class="progress-container">
      <div ref="myBar" class="myBar"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Production } from "../class/Production";
import { Caisse } from "../class/Caisse";
import { Etat } from '../class/EnumEtat';

export default {
  data() {
    return {
      buttonStartText: "Démarer",
      prodName: "",
      boxProd: "",
      prodCount: 0,
      errorProdCount: 0,
      errorProdCountHours: 0,
      boxModel: null,
      production: null,
      idInterval: null,
      isStartButtonDisabled: false,
      isbreakButtonDisabled: true,
      isStopButtonDisabled: true
    };
  },
  created() {
      this.boxModel = new Caisse("Caisse en Bois", 500);
      this.production = new Production(this.boxModel, 25, "Production de Caisse en bois");
  },
  mounted() {
    this.prodName = this.production.getProdName();
    this.boxProd = this.boxModel.getName();
    this.observerProd();
  },
  methods: {
    observerProd() {
      this.idInterval = setInterval(this.start, this.boxModel.getSpeed());
    },
    startProd() {
      this.isStartButtonDisabled = true;
      this.isbreakButtonDisabled = false;
      this.isStopButtonDisabled = false;
      this.production.startProd();
    },
    breakProd() {
      this.buttonStartText = "Reprendre";
      this.isStartButtonDisabled = false;
      this.isbreakButtonDisabled = true;
      this.production.breakProd();
    },
    stopProd() {
      this.production.stopProd();
      clearInterval(this.idInterval);
      this.isStartButtonDisabled = true;
      this.isbreakButtonDisabled = true;
      this.isStopButtonDisabled = true;
    },
    start() {
      if (this.production.getProductBoxCount() < this.production.getGoalProd() - 1 && this.production.getState() !== Etat.Stop) {
        if (this.production.getState() === Etat.Actif) {
          this.production.addBox();
          this.update();
        }
      } else {
        this.production.addBox();
        this.update();
        clearInterval(this.idInterval);
        this.isStartButtonDisabled = true;
        this.isbreakButtonDisabled = true;
        this.isStopButtonDisabled = true;
      }
    },
    update() {
      this.prodCount = this.production.getProductBoxCount();
      this.errorProdCount = this.production.getInvalidPercent();
      this.errorProdCountHours = this.production.getInvalidHourPercent();
      this.move();
    },
    move() {
      const myBar = this.$refs.myBar as HTMLElement;
      if(myBar){
        myBar.style.width = (this.prodCount * 100) / this.production.getGoalProd() + "%";
        myBar.innerHTML = (this.prodCount * 100) / this.production.getGoalProd() + "%";
      }

    }
  }
};
</script>

<style lang="scss">
#here {
  display: flex;
  flex-wrap: wrap;
  margin: 5px auto 5px auto;
  width: 30vh;
  justify-content: center;
  border: 2px double black;

  .button {
    display: flex;
    width: 100%;
    justify-content: space-between;

    button {
      width: 30%;
    }
  }

  .info {
    border-collapse: collapse;
    th, td {
      border: 1px dotted black;
      text-align: center;
    }
  }

  .progress-container {
    width: 50%;
    margin: 20px auto;

    .myBar {
      width: 0;
      height: 30px;
      background-color: #4CAF50;
      text-align: center;
      line-height: 30px;
      color: white;
    }
  }
}
</style>