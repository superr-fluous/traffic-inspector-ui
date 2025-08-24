package models

import (
	"time"
)

type Ndpi struct {
	Proto    string `json:"proto"`
	Category string `json:"category"`
}

type Flow struct {
	Id             string    `gorm:"primaryKey;column:id" json:"id"`
	SrcMac         string    `json:"src_mac"`
	DstMac         string    `json:"dst_mac"`
	SrcIp          string    `json:"src_ip"`
	DstIp          string    `json:"dest_ip"`
	SrcPort        uint16    `json:"src_port"`
	DstPort        uint16    `json:"dst_port"`
	IpV            uint8     `json:"ipv" gorm:"column:ipv"`
	TcpFingerprint string    `json:"tcp_fingerprint"`
	SrcOS          string    `json:"src_os"`
	DstOS          string    `json:"dst_os"`
	Proto          string    `json:"proto"`
	SrcCountry     string    `json:"src_country"`
	DstCountry     string    `json:"dst_country"`
	SrcAS          string    `json:"src_as"`
	DstAS          string    `json:"dst_as"`
	FirstSeen      time.Time `json:"first_seen"`
	LastSeen       time.Time `json:"last_seen"`
	SrcNumPkts     uint64    `json:"src_num_pkts"`
	DstNumPkts     uint64    `json:"dst_num_pkts"`
	SrcLenPkts     uint64    `json:"src_len_pkts"`
	DstLenPkts     uint64    `json:"dst_len_pkts"`
	Ndpi           Ndpi      `gorm:"type:jsonb;embedded;embeddedPrefix:ndpi_" json:"ndpi"`
}
