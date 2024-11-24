package main

import (
	"fmt"
	"runtime"
	"strconv"

	"github.com/shirou/gopsutil/host"
	"github.com/shirou/gopsutil/v4/mem"
)

func main() {
	runTimeOS := runtime.GOOS

	vmStat, err := mem.VirtualMemory()
	if err != nil {
		fmt.Println(err)
	}

	hostStat, err := host.Info()
	if err != nil {
		fmt.Println(err)
	}

	html := "<div class='system-data'><table class='table table-striped table-hover table-sm'><tbody>"
	html = html + "<tr><td>Operating System:</td> <td><i class='fa fa-brands fa-linux'></i> " + runTimeOS + "</td></tr>"
	html = html + "<tr><td>Platform:</td><td> <i class='fa fa-brands fa-fedora'></i> " + hostStat.Platform + "</td></tr>"
	html = html + "<tr><td>Hostname:</td><td>" + hostStat.Hostname + "</td></tr>"
	html = html + "<tr><td>Number of processes running:</td><td>" + strconv.FormatUint(hostStat.Procs, 10) + "</td></tr>"
	html = html + "<tr><td>Percentage used memory:</td><td>" + strconv.FormatFloat(vmStat.UsedPercent, 'f', 2, 64) + "%</td></tr></tbody></table>"

	html = html + "</div>"
	fmt.Println(html)
}
