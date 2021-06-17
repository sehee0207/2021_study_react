function Today() {
    const weekEngShortName: string[] = ["일", "월", "화", "수", "목", "금", "토"];
    const d = new Date();
    const year:number = d.getFullYear();
    const month:number = (d.getMonth() + 1);
    const day:number = d.getDate();
    const week:number = d.getDay();
    
    return("오늘은 " + year+"년 "+month+"월 "+day+ "일 " + weekEngShortName[week] + "요일입니다");
}

export default Today();