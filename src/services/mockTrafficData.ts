// src/services/mockTrafficData.ts
export const generateTrafficData = (timeRange: string) => {
    const dataPoints = timeRange === '15m' ? 15 : 
                      timeRange === '1h' ? 60 :
                      timeRange === '6h' ? 72 :
                      timeRange === '24h' ? 96 : 168;
    
    const data = [];
    const now = new Date();
    
    for (let i = 0; i < dataPoints; i++) {
        const timestamp = new Date(now.getTime() - (dataPoints - i) * 60000);
        data.push({
            timestamp: timestamp.toISOString(),
            incoming: Math.floor(Math.random() * 800) + 200,
            outgoing: Math.floor(Math.random() * 600) + 100,
            threats: Math.floor(Math.random() * 30)
        });
    }
    
    return data;
};

export const generateTopTalkers = () => {
    const ips = [
        '192.168.1.100', '192.168.1.101', '10.0.0.45', '10.0.0.67', 
        '172.16.0.23', '172.16.0.89', '192.168.2.15', '192.168.2.32',
        '10.10.10.5', '10.10.10.12'
    ];
    
    return ips.map(ip => ({
        ip,
        bytes: Math.floor(Math.random() * 1000000000) + 100000000,
        packets: Math.floor(Math.random() * 1000000) + 100000,
        flows: Math.floor(Math.random() * 100) + 20,
        threats: Math.floor(Math.random() * 10),
        status: Math.random() > 0.7 ? 'suspicious' : Math.random() > 0.8 ? 'blocked' : 'normal'
    })).sort((a, b) => b.bytes - a.bytes);
};

export const generateProtocolData = () => {
    return [
        { protocol: 'TCP', percentage: 45, bytes: 450000000, color: '#1976d2' },
        { protocol: 'UDP', percentage: 25, bytes: 250000000, color: '#ed6c02' },
        { protocol: 'HTTPS', percentage: 15, bytes: 150000000, color: '#2e7d32' },
        { protocol: 'DNS', percentage: 8, bytes: 80000000, color: '#9c27b0' },
        { protocol: 'ICMP', percentage: 4, bytes: 40000000, color: '#d32f2f' },
        { protocol: 'Other', percentage: 3, bytes: 30000000, color: '#757575' }
    ];
};