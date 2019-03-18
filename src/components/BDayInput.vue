<template>
  <div class="container">
    <div class="bday-wrapper">
      <div class="bday-picker" :class="{ open }">
        <div class="bday-input" @click="openPicker(0)">
          <span @click.stop="openPicker(0)" :class="{ active: step === 0 }">{{ day | formatNumbers }}</span>
          <span class="seperator">/</span>
          <span @click.stop="openPicker(-100)" :class="{ active: step === -100 }">{{ month | formatNumbers }}</span>
          <span class="seperator">/</span>
          <span class="year" @click.stop="openPicker(-200)" :class="{ active: step === -200 }">{{ year }}</span>
          <input type="date" class="validator" :value="birthdate" required />
        </div>
        <div class="bday-box">
          <div class="heading">{{ labelText }}</div>
          <div class="bday-box-content" :style="{ transform: 'translateX(' + step + '%)' }">
            <div class="bday-days">
              <div class="bday-day" v-for="i in 31" :key="i" @click="setDay(i)" :class="{ active: day === i }">{{ i }}</div>
            </div>
            <div class="bday-months">
              <div class="bday-month" v-for="(monthObj, idx) in months" :key="idx" @click="setMonth(idx)"
                :class="{ disabled: monthObj.days < day, active: month === idx }">{{ monthObj.name }}</div>
            </div>
            <div class="bday-years">
              <div class="bday-year" v-for="yearNum in years" :key="yearNum" @click="setYear(yearNum)"
                :class="{ disabled: minYear < yearNum, active: yearNum === year }">{{ yearNum }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const months = [
    { name: 'Januar', days: 31 },
    { name: 'Februar', days: 28 },
    { name: 'März', days: 31 },
    { name: 'April', days: 30 },
    { name: 'Mai', days: 31 },
    { name: 'Juni', days: 30 },
    { name: 'Juli', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'Oktober', days: 31 },
    { name: 'November', days: 30 },
    { name: 'Dezember', days: 31 }
  ]

  export default {
    name: 'BirthdayInput',
    data() {
      return {
        months,
        day: 'DD',
        month: 'MM',
        year: 'YYYY',
        step: null,
        open: false
      }
    },
    computed: {
      minYear() {
        const date = new Date()
        const month = date.getMonth() + 1
        const day = date.getDay()
        let year = date.getFullYear()

        if (this.month > month || this.month === month && this.day > day) {
          year--
        }

        return year
      },
      years() {
        const years = []
        const year = new Date().getFullYear()
        for (let i = year; i > 1919; i--) {
          years.push(i)
        }

        return years
      },
      labelText() {
        switch (this.step) {
          case 0:
            return 'Select a day'

          case -100:
            return 'Select a month'

          default:
            return 'Select a year'
        }
      },
      birthdate() {
        const month = (this.month < 10 ? '0' : '') + this.month
        const day = (this.day < 10 ? '0' : '') + this.day
        return this.year + '-' + month + '-' + day
      }
    },
    methods: {
      openPicker(step) {
        this.open = true
        this.step = step
      },
      setDay(day) {
        this.day = day
        this.step = -100
      },
      setMonth(month) {
        if (this.day > this.months[month].days) {
          return
        }

        this.month = (month + 1)
        this.step = -200
      },
      setYear(year) {
        if (year > this.minYear) {
          return
        }

        this.year = year
        this.step = null
        this.open = false
      }
    },
    filters: {
      formatNumbers: function (value) {
        if (!value) return ''
        return (value < 10 ? '0' : '') + value
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bday-wrapper {
    --bg-color: #ffffff;
    --border-color: #cccccc;
    --color-inactive: #cccccc;
    --color-highlight: rgb(233, 90, 112);

    --font-size: 1em;
    --text-ratio: 1.075;
    --text-md: calc(1em / var(--text-ratio));
  }

  .container {
    align-items: center;
    display: grid;
    justify-items: center;
  }

  .bday-wrapper {
    font-size: var(--font-size);
    width: 380px;
  }

  .bday {
    &-picker {
      background: var(--bg-color);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      max-height: 52px;
      overflow: hidden;
      position: relative;
      transition: all .35s ease-in-out;
      width: 100%;
    }

    &-input {
      background: var(--bg-color);
      font-weight: bold;
      padding: 16px 24px;
      text-align: center;

      span:not(.seperator) {
        display: inline-block;
        min-width: 24px;
        position: relative;
        z-index: 1;

        &.year {
          min-width: 48px;
        }
      }

      .seperator {
        color: var(--color-inactive);
        font-weight: normal;
        padding: 0 4px;
      }

      .validator {
        border: none;
        left: 0;
        max-height: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        width: 0;
        z-index: 0;
      }
    }

    &-box {
      border-top: 1px solid transparent;
      font-size: var(--text-md);
      max-height: 0;
      overflow: hidden;
      position: relative;
      text-align: center;
      transition: max-height .75s ease-in-out, border-color .3s ease .2s;

      .heading {
        color: var(--color-inactive);
        padding: 16px 0 12px;
      }
    }

    &-picker.open:hover {
      max-height: 500px;

      .bday-input .active {
        color: var(--color-highlight);
      }

      .bday-box {
        border-top-color: var(--border-color);
        max-height: 100%;
      }
    }

    &-box-content {
      display: grid;
      grid-template-columns: 100% 100% 100%;
      padding-bottom: 6px;
      transition: transform .25s ease-in-out;
    }

    &-days,
    &-months,
    &-years {
      align-items: flex-start;
      display: flex;
      flex-wrap: wrap;
      padding: 0 42px;
    }

    &-years {
      height: 235px;
      overflow: hidden;
      overflow-y: scroll;
    }

    &-day,
    &-month,
    &-year {
      border: 1px solid transparent;
      border-radius: 4px;
      font-weight: 500;
      line-height: 38px;
      margin: 1px;
      transition: border-color .12s ease .1s, background .12s ease, color .12s ease;

      &:not(.disabled) {
        cursor: pointer;

        &:hover,
        &.active {
          background: var(--color-highlight);
          border-color: var(--border-color);
          color: #ffffff;
          transition: border-color .12s ease, background .12s ease .1s, color .12s ease .1s;
        }
      }

      &.disabled {
        color: var(--color-inactive);
      }
    }

    &-day {
      min-width: calc(100% / 6 - 2px);
    }

    &-month {
      min-width: calc(100% / 3 - 2px);
    }

    &-year {
      min-width: calc(100% / 5 - 2px);
    }
  }
</style>