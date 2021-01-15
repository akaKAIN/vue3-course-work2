<template>
  <div class="container column">
    <input-form @get-form="addInput"></input-form>

    <div class="card card-w70">
      <h1>Резюме Nickname</h1>
      <div class="avatar">
        <img
          src="https://cdn.dribbble.com/users/5592443/screenshots/14279501/drbl_pop_r_m_rick_4x.png"
        />
      </div>
      <h2>Опыт работы</h2>
      <p>
        главный герой американского мультсериала «Рик и Морти», гениальный
        учёный, изобретатель, атеист (хотя в некоторых сериях он даже молится
        Богу, однако, каждый раз после чудесного спасения ссылается на удачу и
        вновь отвергает его существование), алкоголик, социопат, дедушка Морти.
        На момент начала третьего сезона ему 70 лет[1]. Рик боится пиратов, а
        его главной слабостью является некий - "Санчезиум". Исходя из того, что
        существует неограниченное количество вселенных, существует
        неограниченное количество Риков, герой сериала предположительно
        принадлежит к измерению С-137. В серии комикcов Рик относится к
        измерению C-132, а в игре «Pocket Mortys» — к измерению C-123[2].
        Прототипом Рика Санчеза является Эмметт Браун, герой кинотрилогии «Назад
        в будущее»[3].
      </p>
      <h3>Добавьте первый блок, чтобы увидеть результат</h3>
    </div>
  </div>
  <div class="container">
    <p>
      <button class="btn primary">Загрузить комментарии</button>
    </p>
    <div class="card">
      <h2>Комментарии</h2>
      <ul class="list">
        <li class="list-item">
          <div>
            <p><strong>test@microsoft.com</strong></p>
            <small
              >Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Eligendi, reiciendis.</small
            >
          </div>
        </li>
      </ul>
    </div>
    <div class="loader"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputForm from "@/components/InputForm.vue";
import { InputObject } from "@/models/base";

export default defineComponent({
  components: { InputForm },
  setup() {
    const addInput = (inputObj: InputObject) => {
      console.log(inputObj);
    };

    return { addInput };
  }
});
</script>

<style>
.avatar {
  display: flex;
  justify-content: center;
}

.avatar img {
  width: 150px;
  height: auto;
  border-radius: 50%;
}
</style>
