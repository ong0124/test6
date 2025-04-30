export function TranslateStatus(status: string): string {
    const statusMap: Record<string, string> = {
      complete: '完成',
      notTraveled: '未出行',
    }
  
    return statusMap[status] || '未知状态'
}