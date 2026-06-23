export const calendar = async (year, month) => {
  const calendarEl = document.getElementById('calendar');
  // const eventHolder;
  // try {
  //   const res = await axios({
  //     method: 'GET',
  //     url: `http://localhost:5000/api/v1/course/`
  //   });

  //   // @需要处理 course 的日期格式
  //   if (res.data.success == true) {
  //     eventHolder = res.data.data;
  //   }
  // } catch (err) {
  //   showAlert('danger', err.response.data.error);
  // }

  const eventHolder = [
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-01`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-02`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-03`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-04`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-05`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-06`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-07`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-08`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-09`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-10`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-11`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-12`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-13`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-14`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-15`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-16`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-17`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-18`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-19`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-20`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-21`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-22`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-23`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-24`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-25`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-26`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-27`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-28`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-29`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-30`
    },
    {
      title: '⚪ 可以预约',
      url: '/schedule',
      start: `${year}-${month}-31`
    }
  ];

  const calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'zh-cn',
    initialView: 'dayGridMonth',
    initialDate: `${year}-${month}-01`,
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },
    events: eventHolder
  });

  calendar.render();
}