function Today() {
    const weekEngShortName = ["일", "월", "화", "수", "목", "금", "토"];
    const d = new Date();
    const year = d.getFullYear();
    const month = (d.getMonth() + 1);
    const day = d.getDate();
    const week = d.getDay();

    return("오늘은 " + year+"년 "+month+"월 "+day+ "일 " + weekEngShortName[week] + "요일입니다");
}

export default Today();